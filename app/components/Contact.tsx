"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";

// All countries list
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const packagesData = [
  // 1-on-1 Private Sessions
  { id: 'single', name: '1-on-1: Single Session', price: '200 DHS', type: 'private' },
  { id: 'weekly', name: '1-on-1: Weekly Package', price: '550 DHS', type: 'private' },
  { id: 'monthly', name: '1-on-1: Monthly Package', price: '2200 DHS', type: 'private' },
  { id: 'trimester', name: '1-on-1: Trimester Package', price: '6500 DHS', type: 'private' },
  // Group Sessions
  { id: 'group10', name: 'Group of 10', price: '200 MAD/month', type: 'group' },
  { id: 'group5', name: 'Group of 5', price: '400 MAD/month', type: 'group' },
];

const groupTimeSlots = [
  { id: '8pm-9pm', label: '8:00 p.m. – 9:00 p.m.' },
  { id: '9pm-10pm', label: '9:00 p.m. – 10:00 p.m.' },
];

const groupDays = [
  { id: 'mon-wed', label: 'Monday – Wednesday' },
  { id: 'tue-thu', label: 'Tuesday – Thursday' },
  { id: 'fri-sun', label: 'Friday – Sunday' },
];

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showQRModal, setShowQRModal] = useState(false);
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    phone: '',
    email: '',
    age: '',
    sex: '',
    country: 'Morocco',
    city: '',
    package: '',
    groupTimeSlot: '',
    groupDays: '',
    message: ''
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('takalam_form_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (e) {
        console.error('Error loading saved form data:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (formData.firstName || formData.email || formData.phone) {
      localStorage.setItem('takalam_form_data', JSON.stringify(formData));
    }
  }, [formData]);

  // Validate current step
  const isStep1Valid = () => {
    return formData.firstName && formData.familyName && formData.phone && 
           formData.email && formData.age && formData.sex && formData.country && formData.city;
  };

  const isStep2Valid = () => {
    if (!formData.package) return false;
    if (formData.package.startsWith('group')) {
      return formData.groupTimeSlot && formData.groupDays;
    }
    return true;
  };

  const isStep3Valid = () => {
    return paymentScreenshot !== null;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Check if selected package is a group package or private package
  const isGroupPackage = formData.package.startsWith('group');
  const isPrivatePackage = formData.package !== '' && !isGroupPackage;
  const hasSelectedPackage = formData.package !== '';


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (images and PDF)
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        alert('Please upload an image (PNG, JPG) or PDF file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setPaymentScreenshot(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePaymentScreenshot = () => {
    setPaymentScreenshot(null);
    setPaymentPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Google Apps Script URL for form submissions
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyPyl7P6D7lntbnTkP2q8S2RfbbAYD3NCG1mqmXdnIuZCdsaQRfVb8VUqOsLoyQe9JWfA/exec';
      
      const selectedPackage = packagesData.find(p => p.id === formData.package);
      const isGroup = formData.package.startsWith('group');
      const selectedTimeSlot = groupTimeSlots.find(t => t.id === formData.groupTimeSlot);
      const selectedDays = groupDays.find(d => d.id === formData.groupDays);
      
      // Convert payment screenshot to base64 if present
      let paymentScreenshotBase64 = '';
      let paymentScreenshotName = '';
      if (paymentScreenshot) {
        paymentScreenshotBase64 = paymentPreview || '';
        paymentScreenshotName = paymentScreenshot.name;
      }
      
      const dataToSend = {
        firstName: formData.firstName,
        familyName: formData.familyName,
        phone: formData.phone,
        email: formData.email,
        age: formData.age,
        sex: formData.sex,
        country: formData.country,
        city: formData.city,
        package: `${selectedPackage?.name || 'Not specified'} - ${selectedPackage?.price || ''}`,
        packageType: isGroup ? 'Group Session' : '1-on-1 Private Session',
        groupTimeSlot: isGroup ? (selectedTimeSlot?.label || 'Not specified') : 'N/A',
        groupDays: isGroup ? (selectedDays?.label || 'Not specified') : 'N/A',
        message: formData.message || '',
        paymentScreenshot: paymentScreenshotBase64,
        paymentScreenshotName: paymentScreenshotName,
        paymentStatus: paymentScreenshot ? 'Screenshot Uploaded' : 'No screenshot uploaded',
        submittedAt: new Date().toLocaleString()
      };

      // Send to Google Sheets
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      // With no-cors mode, we can't read the response, so we assume success
      // The Google Script handles errors internally

      // Track Meta Pixel Lead event
      if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {
          content_name: formData.package || 'Registration',
          content_category: 'English Course',
          currency: 'MAD'
        });
      }

      setSubmitStatus('success');
      setPaymentScreenshot(null);
      setPaymentPreview(null);
      setCurrentStep(1);
      localStorage.removeItem('takalam_form_data');
      setFormData({
        firstName: '',
        familyName: '',
        phone: '',
        email: '',
        age: '',
        sex: '',
        country: 'Morocco',
        city: '',
        package: '',
        groupTimeSlot: '',
        groupDays: '',
        message: ''
      });
      
      // Scroll to success message
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("contact.title")} <span className="text-green-600">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Multi-Step Form Progress Indicator */}
        <div
          className={`mb-10 ${isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > 1 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : '1'}
                </div>
                <span className={`text-xs mt-2 font-medium ${currentStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                  {t("contact.formStep1Title")}
                </span>
              </div>

              {/* Connector */}
              <div className={`flex-1 h-1 mx-2 rounded ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > 2 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : '2'}
                </div>
                <span className={`text-xs mt-2 font-medium ${currentStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                  {t("contact.formStep2Title")}
                </span>
              </div>

              {/* Connector */}
              <div className={`flex-1 h-1 mx-2 rounded ${currentStep > 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className={`text-xs mt-2 font-medium ${currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                  {t("contact.formStep3Title")}
                </span>
              </div>
            </div>
            
            {/* Auto-save indicator */}
            {(formData.firstName || formData.email) && (
              <div className="text-center mt-4">
                <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t("contact.autoSaved")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Communication Policy Banner */}
        <div
          className={`mb-10 ${isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}
        >
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-amber-800 mb-1">{t("contact.commPolicyTitle")}</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {t("contact.commPolicy1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t("contact.commPolicy2")}
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t("contact.commPolicy3")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div
          className={`mb-6 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {t("contact.formTitle")}
            </h3>

              {submitStatus === 'success' && (
                <div ref={successRef} className="mb-6 p-5 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 text-green-700 mb-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-lg">{t("contact.successTitle")}</span>
                  </div>
                  <p className="text-green-700 mb-2">{t("contact.successText")}</p>
                  <p className="text-green-600 text-sm">{t("contact.successNote")}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{t("contact.errorTitle")}</span>
                  </div>
                  <p className="text-sm mt-1">{t("contact.errorText")}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* STEP 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-green-800 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {t("contact.formStep1Title")}
                      </h4>
                      <p className="text-sm text-green-600 mt-1">{t("contact.formStep1Desc")}</p>
                    </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.firstName")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.familyName")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="familyName"
                      name="familyName"
                      required
                      value={formData.familyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.phone")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                      placeholder="+212 600 000 000"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.email")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.age")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="10"
                      max="100"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.sex")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <select
                      id="sex"
                      name="sex"
                      required
                      value={formData.sex}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white"
                    >
                      <option value="">...</option>
                      <option value="Male">{t("contact.male")}</option>
                      <option value="Female">{t("contact.female")}</option>
                      <option value="Prefer not to say">{t("contact.preferNotToSay")}</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.country")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white"
                    >
                      <option value="">{t("contact.selectCountry")}</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.city")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                    {/* Step 1 Navigation */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStep1Valid()}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {t("contact.nextStep")}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Package Selection */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        {t("contact.formStep2Title")}
                      </h4>
                      <p className="text-sm text-blue-600 mt-1">{t("contact.formStep2Desc")}</p>
                    </div>

                <div>
                  <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.packageSelected")} <span className="text-red-500">{t("contact.required")}</span>
                  </label>
                  <select
                    id="package"
                    name="package"
                    required
                    value={formData.package}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="">{t("contact.selectPackage")}</option>
                    {packagesData.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calendar - Only show when 1-on-1 private package is selected */}
                {isPrivatePackage && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-green-800">{t("contact.bookSession")}</span>
                    </div>
                    <p className="text-sm text-green-700 mb-4">{t("contact.calendarInFormDesc")}</p>
                    <div className="bg-white rounded-xl overflow-hidden border border-green-200 shadow-sm">
                      <iframe
                        src="https://cal.com/takalam-english-center-azwhqs/50mins?embed=true&theme=light&layout=month_view"
                        style={{ width: '100%', height: '450px', border: 'none' }}
                        frameBorder="0"
                        title="Book a Session - Takalam Calendar"
                        allow="payment"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                {/* Group Session Fields - Only show when group package is selected */}
                {isGroupPackage && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-blue-800">{t("contact.groupScheduleTitle")}</span>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="groupTimeSlot" className="block text-sm font-medium text-blue-800 mb-1">
                          {t("contact.groupTimeSlot")} <span className="text-red-500">{t("contact.required")}</span>
                        </label>
                        <select
                          id="groupTimeSlot"
                          name="groupTimeSlot"
                          required={isGroupPackage}
                          value={formData.groupTimeSlot}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                        >
                          <option value="">{t("contact.selectTimeSlot")}</option>
                          {groupTimeSlots.map((slot) => (
                            <option key={slot.id} value={slot.id}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="groupDays" className="block text-sm font-medium text-blue-800 mb-1">
                          {t("contact.groupDays")} <span className="text-red-500">{t("contact.required")}</span>
                        </label>
                        <select
                          id="groupDays"
                          name="groupDays"
                          required={isGroupPackage}
                          value={formData.groupDays}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                        >
                          <option value="">{t("contact.selectDays")}</option>
                          {groupDays.map((day) => (
                            <option key={day.id} value={day.id}>
                              {day.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <p className="text-xs text-blue-700">
                      {t("contact.groupScheduleNote")}
                    </p>
                  </div>
                )}

                    {/* Step 2 Navigation */}
                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("contact.prevStep")}
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStep2Valid()}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {t("contact.nextStep")}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Payment & Submit */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <h4 className="font-semibold text-amber-800 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        {t("contact.formStep3Title")}
                      </h4>
                      <p className="text-sm text-amber-600 mt-1">{t("contact.formStep3Desc")}</p>
                    </div>

                {/* Selected Package Summary */}
                {hasSelectedPackage && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">{t("contact.packageSelected")}</p>
                    <p className="font-semibold text-gray-800">
                      {packagesData.find(p => p.id === formData.package)?.name} — <span className="text-green-600">{packagesData.find(p => p.id === formData.package)?.price}</span>
                    </p>
                  </div>
                )}

                {/* Payment Options */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Bank Transfer */}
                  <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold">{t("contact.bankingTitle")}</h4>
                        <p className="text-green-100 text-xs">{t("contact.bankingSubtitle")}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 text-sm">
                      <div className="bg-white/10 rounded-lg p-2">
                        <p className="text-green-200 text-[10px] uppercase tracking-wide">{t("contact.accountHolder")}</p>
                        <p className="font-semibold text-xs">MONSIEUR MOHAMMED SAID EL BOUZDOUDI</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2">
                        <p className="text-green-200 text-[10px] uppercase tracking-wide">RIB</p>
                        <p className="font-mono font-bold text-xs tracking-wide">230 727 2633040211016600 70</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2">
                        <p className="text-green-200 text-[10px] uppercase tracking-wide">IBAN</p>
                        <p className="font-mono font-bold text-xs tracking-wide">MA64 2307 2726 3304 0211 0166 0070</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2">
                        <p className="text-green-200 text-[10px] uppercase tracking-wide">Code SWIFT</p>
                        <p className="font-mono font-bold text-xs">CIHMMAMC</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/20">
                      <button
                        type="button"
                        onClick={() => setShowQRModal(true)}
                        className="bg-white rounded-xl p-2 mx-auto w-fit block cursor-pointer hover:scale-105 transition-transform"
                      >
                        <Image
                          src="/bank-qr.png"
                          alt="Scan for bank details - Click to enlarge"
                          width={280}
                          height={400}
                          className="w-full max-w-[120px] h-auto rounded-lg"
                        />
                        <p className="text-[10px] text-gray-500 mt-1 text-center">{t("contact.clickToEnlarge")}</p>
                      </button>
                    </div>

                    <p className="text-green-100 text-xs mt-2">
                      {t("contact.transferNote")}
                    </p>
                  </div>

                  {/* PayPal */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.717 0-3.146 1.27-3.403 2.955l-1.12 7.106c-.083.518.32.99.846.99h4.606c.524 0 .967-.382 1.05-.9l.896-5.678c.082-.518.525-.9 1.05-.9h.677c4.298 0 7.664-1.746 8.647-6.796.403-2.067.135-3.666-1.853-4.572z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold">{t("contact.paypalTitle")}</h4>
                        <p className="text-blue-100 text-xs">{t("contact.paypalSubtitle")}</p>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3 mb-3">
                      <p className="text-blue-200 text-[10px] uppercase tracking-wide mb-1">{t("contact.paypalSendTo")}</p>
                      <p className="font-mono font-bold text-sm break-all">mohammedsaidelbouzdoudi99@gmail.com</p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-blue-200 text-xs mb-2">{t("contact.paypalHowTo")}</p>
                      <ol className="text-xs space-y-1 text-blue-50">
                        <li className="flex items-start gap-2">
                          <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">1</span>
                          <span>{t("contact.paypalStep1")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">2</span>
                          <span>{t("contact.paypalStep2")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">3</span>
                          <span>{t("contact.paypalStep3")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">4</span>
                          <span>{t("contact.paypalStep4")}</span>
                        </li>
                      </ol>
                    </div>

                    <p className="text-blue-200 text-[10px] mt-3 text-center">
                      {t("contact.paypalIdeal")}
                    </p>
                  </div>
                </div>

                {/* Payment Screenshot Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("contact.paymentScreenshotLabel")} <span className="text-red-500">{t("contact.required")}</span>
                  </label>
                  
                  {!paymentPreview ? (
                    <div className="relative">
                      <input
                        type="file"
                        id="paymentScreenshot"
                        accept="image/*,.pdf,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="paymentScreenshot"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-all"
                      >
                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-500">{t("contact.uploadScreenshot")}</span>
                        <span className="text-xs text-red-400 mt-1">{t("contact.uploadScreenshotRequired")}</span>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
                        <Image
                          src={paymentPreview}
                          alt="Payment screenshot preview"
                          fill
                          className="object-contain bg-gray-50"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removePaymentScreenshot}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t("contact.screenshotReady")}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">{t("contact.screenshotNote")}</p>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.additionalMessage")} <span className="text-gray-400">({t("contact.optional")})</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder={t("contact.messagePlaceholder")}
                  ></textarea>
                </div>

                    {/* Step 3 Navigation & Submit */}
                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("contact.prevStep")}
                      </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !paymentScreenshot}
                  className="btn-primary bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("contact.submitting")}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t("contact.submitButton")}
                    </>
                  )}
                </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQRModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-4 max-w-md w-full relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{t("contact.qrModalTitle")}</h3>
            <Image
              src="/bank-qr.png"
              alt="Bank QR Code"
              width={400}
              height={600}
              className="w-full h-auto rounded-xl"
            />
            <p className="text-sm text-gray-500 mt-3 text-center">{t("contact.qrModalDesc")}</p>
          </div>
        </div>
      )}
    </section>
  );
}
