from rest_framework import serializers
from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.utils.crypto import get_random_string
from datetime import date
from .models import User, DoctorProfile

class UserSerializer(serializers.ModelSerializer):
    specialization = serializers.SerializerMethodField()
    consultation_fee = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 
                  'role', 'phone_number', 'profile_picture', 'address', 'date_of_birth',
                  'specialization', 'consultation_fee', 'is_active')
        read_only_fields = ('id', 'username', 'role')
    
    def get_specialization(self, obj):
        if obj.role == 'doctor':
            try:
                return obj.doctor_profile.specialization
            except DoctorProfile.DoesNotExist:
                return None
        return None
    
    def get_consultation_fee(self, obj):
        if obj.role == 'doctor':
            try:
                return str(obj.doctor_profile.consultation_fee)
            except DoctorProfile.DoesNotExist:
                return '0'
        return None

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    specialization = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 
                  'role', 'phone_number', 'profile_picture', 'address', 'date_of_birth',
                  'specialization')
        read_only_fields = ('id', 'username', 'role')
    
    def get_specialization(self, obj):
        if obj.role == 'doctor':
            try:
                return obj.doctor_profile.specialization
            except DoctorProfile.DoesNotExist:
                return None
        return None

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    # Doctor specific fields - all optional in the serializer (validated separately)
    specialization = serializers.CharField(write_only=True, required=False, allow_blank=True)
    license_number = serializers.CharField(write_only=True, required=False, allow_blank=True)
    years_of_experience = serializers.CharField(write_only=True, required=False, allow_blank=True)
    consultation_fee = serializers.CharField(write_only=True, required=False, allow_blank=True)
    available_days = serializers.CharField(write_only=True, required=False, allow_blank=True)
    bio = serializers.CharField(write_only=True, required=False, allow_blank=True)
    date_of_birth = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'first_name', 
                  'last_name', 'role', 'phone_number', 'specialization', 'license_number',
                  'years_of_experience', 'consultation_fee', 'available_days', 'bio',
                  'address', 'date_of_birth')
        extra_kwargs = {
            'username': {'validators': []},
        }
    
    def validate(self, attrs):
        username = (attrs.get('username') or '').strip()
        if not username:
            username = f"user_{get_random_string(8).lower()}"
        attrs['username'] = self._ensure_unique_username(username)

        password = attrs.get('password')
        password2 = attrs.get('password2')
        if not password:
            password = get_random_string(12)
            attrs['password'] = password
        if not password2:
            attrs['password2'] = password
        elif password != password2:
            attrs['password2'] = password

        role = attrs.get('role', 'patient')
        if role not in {'patient', 'doctor', 'admin'}:
            role = 'patient'
            attrs['role'] = role

        dob_raw = attrs.get('date_of_birth', None)
        years_raw = attrs.get('years_of_experience', '')
        fee_raw = attrs.get('consultation_fee', '')

        if dob_raw in (None, ''):
            attrs['date_of_birth'] = None
        else:
            try:
                attrs['date_of_birth'] = date.fromisoformat(str(dob_raw))
            except ValueError:
                attrs['date_of_birth'] = None

        if years_raw in (None, ''):
            attrs['years_of_experience'] = 0
        else:
            try:
                years_value = int(years_raw)
            except (ValueError, TypeError):
                years_value = 0
            if years_value < 0:
                years_value = 0
            attrs['years_of_experience'] = years_value

        if fee_raw in (None, ''):
            attrs['consultation_fee'] = 0
        else:
            try:
                fee_value = float(fee_raw)
            except (ValueError, TypeError):
                fee_value = 0
            if fee_value < 0:
                fee_value = 0
            attrs['consultation_fee'] = fee_value
        
        return attrs

    def _ensure_unique_username(self, username):
        candidate = username
        while User.objects.filter(username=candidate).exists():
            candidate = f"{username}_{get_random_string(4).lower()}"
        return candidate
    
    def create(self, validated_data):
        role = validated_data.get('role', 'patient')
        specialization = validated_data.pop('specialization', '')
        license_number = validated_data.pop('license_number', '')
        years_of_experience = validated_data.pop('years_of_experience', 0) or 0
        consultation_fee = validated_data.pop('consultation_fee', 0) or 0
        available_days = validated_data.pop('available_days', '') or 'Monday,Tuesday,Wednesday,Thursday,Friday'
        bio = validated_data.pop('bio', '')
        validated_data.pop('password2')
        try:
            user = User.objects.create_user(**validated_data)
        except IntegrityError:
            validated_data['username'] = self._ensure_unique_username(validated_data.get('username', 'user'))
            user = User.objects.create_user(**validated_data)
        
        # Keep user/profile data consistent for all doctor accounts.
        if role == 'doctor':
            DoctorProfile.objects.create(
                user=user,
                specialization=specialization,
                license_number=license_number,
                years_of_experience=years_of_experience,
                consultation_fee=consultation_fee,
                available_days=available_days,
                bio=bio,
            )
        
        return user


class DoctorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = DoctorProfile
        fields = '__all__'
