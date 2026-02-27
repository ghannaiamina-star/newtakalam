'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Google Apps Script Web App URL - Replace with your deployed script URL
const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_TEACHER_SHEET_URL || '';

// File upload status type
type FileUploadStatus = 'idle' | 'uploading' | 'uploaded' | 'error';

interface FileUploadState {
  status: FileUploadStatus;
  progress: number;
  file: File | null;
  base64Data: string;
  error: string;
}

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      // Remove the data:mime/type;base64, prefix
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
}

export default function CareersPage() {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploadSize, setUploadSize] = useState('');
  const [uploadStage, setUploadStage] = useState<'preparing' | 'uploading' | 'processing' | 'done'>('preparing');
  const [uploadStartTime, setUploadStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Individual file upload states
  const [cvUpload, setCvUpload] = useState<FileUploadState>({
    status: 'idle',
    progress: 0,
    file: null,
    base64Data: '',
    error: '',
  });
  const [videoUpload, setVideoUpload] = useState<FileUploadState>({
    status: 'idle',
    progress: 0,
    file: null,
    base64Data: '',
    error: '',
  });
  
  const cvProgressInterval = useRef<NodeJS.Timeout | null>(null);
  const videoProgressInterval = useRef<NodeJS.Timeout | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    certifications: [] as string[],
    specialization: [] as string[],
    cv: null as File | null,
    video: null as File | null,
    availability: '',
    schedule: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Required';
      if (!formData.email.trim()) newErrors.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.phone.trim()) newErrors.phone = 'Required';
    }

    if (step === 2) {
      if (!formData.experience) newErrors.experience = 'Required';
      if (formData.certifications.length === 0) newErrors.certifications = 'Select at least one';
      if (formData.specialization.length === 0) newErrors.specialization = 'Select at least one';
    }

    if (step === 3) {
      if (!cvUpload.file) newErrors.cv = 'CV is required';
      else if (cvUpload.status === 'uploading') newErrors.cv = 'Please wait for CV upload to complete';
      else if (cvUpload.status === 'error') newErrors.cv = 'CV upload failed. Please try again';
      else if (cvUpload.status !== 'uploaded') newErrors.cv = 'CV upload incomplete';
      
      if (!videoUpload.file) newErrors.video = 'Video is required';
      else if (videoUpload.status === 'uploading') newErrors.video = 'Please wait for video upload to complete';
      else if (videoUpload.status === 'error') newErrors.video = 'Video upload failed. Please try again';
      else if (videoUpload.status !== 'uploaded') newErrors.video = 'Video upload incomplete';
    }

    if (step === 4) {
      if (!formData.availability) newErrors.availability = 'Required';
      if (formData.schedule.length === 0) newErrors.schedule = 'Select at least one';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(formStep)) {
      setFormStep(formStep + 1);
    }
  };

  const handleCheckbox = (field: 'certifications' | 'specialization' | 'schedule', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const scrollToApplication = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (cvProgressInterval.current) clearInterval(cvProgressInterval.current);
      if (videoProgressInterval.current) clearInterval(videoProgressInterval.current);
    };
  }, []);

  // Handle CV file selection and upload
  const handleCvUpload = async (file: File | null) => {
    if (!file) return;
    
    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setCvUpload(prev => ({ ...prev, file, status: 'error', error: 'CV must be under 5MB' }));
      return;
    }
    
    // Start upload
    setCvUpload({ status: 'uploading', progress: 0, file, base64Data: '', error: '' });
    setFormData(prev => ({ ...prev, cv: file }));
    
    // Simulate progress based on file size (files read faster than upload would suggest)
    const estimatedTime = Math.max(1000, (file.size / 1024 / 1024) * 500); // ~500ms per MB for reading
    const startTime = Date.now();
    
    cvProgressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(90, (elapsed / estimatedTime) * 100);
      setCvUpload(prev => ({ ...prev, progress }));
    }, 100);
    
    try {
      const base64Data = await fileToBase64(file);
      
      if (cvProgressInterval.current) clearInterval(cvProgressInterval.current);
      
      setCvUpload({
        status: 'uploaded',
        progress: 100,
        file,
        base64Data,
        error: '',
      });
    } catch (error) {
      if (cvProgressInterval.current) clearInterval(cvProgressInterval.current);
      setCvUpload(prev => ({
        ...prev,
        status: 'error',
        progress: 0,
        error: 'Failed to process file. Please try again.',
      }));
    }
  };

  // Handle Video file selection and upload
  const handleVideoUpload = async (file: File | null) => {
    if (!file) return;
    
    // Validate file size
    if (file.size > 25 * 1024 * 1024) {
      setVideoUpload(prev => ({ ...prev, file, status: 'error', error: 'Video must be under 25MB. Please compress it first.' }));
      return;
    }
    
    // Start upload
    setVideoUpload({ status: 'uploading', progress: 0, file, base64Data: '', error: '' });
    setFormData(prev => ({ ...prev, video: file }));
    
    // Simulate progress based on file size
    const estimatedTime = Math.max(2000, (file.size / 1024 / 1024) * 800); // ~800ms per MB for reading video
    const startTime = Date.now();
    
    videoProgressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(90, (elapsed / estimatedTime) * 100);
      setVideoUpload(prev => ({ ...prev, progress }));
    }, 100);
    
    try {
      const base64Data = await fileToBase64(file);
      
      if (videoProgressInterval.current) clearInterval(videoProgressInterval.current);
      
      setVideoUpload({
        status: 'uploaded',
        progress: 100,
        file,
        base64Data,
        error: '',
      });
    } catch (error) {
      if (videoProgressInterval.current) clearInterval(videoProgressInterval.current);
      setVideoUpload(prev => ({
        ...prev,
        status: 'error',
        progress: 0,
        error: 'Failed to process video. Please try again.',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    setUploadProgress('');
    setUploadSize('');
    setUploadStage('preparing');
    setElapsedTime('');
    
    try {
      // Use pre-uploaded base64 data from step 3
      const cvBase64 = cvUpload.base64Data;
      const videoBase64 = videoUpload.base64Data;
      
      // Stage 2: Upload with estimated progress (CORS prevents real tracking)
      setUploadStage('uploading');
      setUploadProgress('Sending your application...');
      
      const payload = JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        certifications: formData.certifications.join(', '),
        specialization: formData.specialization.join(', '),
        availability: formData.availability,
        schedule: formData.schedule.join(', '),
        cvFileName: cvUpload.file?.name || '',
        cvData: cvBase64,
        cvMimeType: cvUpload.file?.type || '',
        videoFileName: videoUpload.file?.name || '',
        videoData: videoBase64,
        videoMimeType: videoUpload.file?.type || '',
      });
      
      // Calculate file size for display
      const payloadSizeKB = payload.length / 1024;
      const payloadSizeMB = payloadSizeKB / 1024;
      setUploadSize(payloadSizeMB >= 1 ? `${payloadSizeMB.toFixed(1)} MB` : `${Math.round(payloadSizeKB)} KB`);
      
      // Start elapsed time counter
      const startTime = Date.now();
      setUploadStartTime(startTime);
      const elapsedTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        if (elapsed < 60) {
          setElapsedTime(`${elapsed}s`);
        } else {
          const mins = Math.floor(elapsed / 60);
          const secs = elapsed % 60;
          setElapsedTime(`${mins}m ${secs}s`);
        }
      }, 1000);
      
      // Use fetch with no-cors for Google Apps Script
      try {
        // After a moment, switch to processing stage to indicate work in progress
        const processingTimeout = setTimeout(() => {
          setUploadStage('processing');
          setUploadProgress('Finishing up... Almost done!');
        }, 3000);
        
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: payload,
        });
        
        clearTimeout(processingTimeout);
        clearInterval(elapsedTimer);
        setUploadStage('done');
        setUploadProgress('Upload complete!');
        
        // Brief delay to show completion
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (fetchError) {
        clearInterval(elapsedTimer);
        throw new Error('Upload failed. Please check your connection and try again.');
      }
      
      // Success
      setUploadStage('done');
      setUploadProgress('');
      setSubmitSuccess(true);
      
      // Track Meta Pixel event for teacher application
      if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq('track', 'SubmitApplication', {
          content_name: 'Teacher Application',
          content_category: 'Recruitment'
        });
      }
      
      setFormStep(1);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        certifications: [],
        specialization: [],
        cv: null,
        video: null,
        availability: '',
        schedule: [],
      });
      // Reset file upload states
      setCvUpload({ status: 'idle', progress: 0, file: null, base64Data: '', error: '' });
      setVideoUpload({ status: 'idle', progress: 0, file: null, base64Data: '', error: '' });
    } catch (error) {
      setUploadProgress('');
      setSubmitError((error as Error).message || 'Failed to submit. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="-my-12">
            <Image src="/logo.png" alt="Takalam" width={600} height={150} className="h-40 w-auto" />
          </Link>
          <button
            onClick={scrollToApplication}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </nav>

      {/* Hero Section with Image */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Teach English with Takalam
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                We're accepting applications from qualified English teachers. 
                Flexible hours, remote work, structured curriculum.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">💰</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">80-100 MAD/hour</p>
                    <p className="text-sm text-slate-500">Based on performance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">🏠</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Remote Work</p>
                    <p className="text-sm text-slate-500">Teach from anywhere</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">📅</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Flexible Schedule</p>
                    <p className="text-sm text-slate-500">Set your own hours</p>
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToApplication}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors"
              >
                Apply Now
              </button>
            </div>

            <div className="relative">
              <Image
                src="/teach.png"
                alt="Teaching at Takalam"
                width={600}
                height={500}
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-3">Qualifications</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  Bachelor's degree (any field)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  TEFL, TESOL, CELTA, or equivalent
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  Strong English proficiency
                </li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-3">Technical Requirements</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  Stable internet connection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  Computer with webcam & mic
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  Quiet teaching environment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Compensation</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-slate-900">80 MAD</p>
                <p className="text-slate-600">Starting rate/hour</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">90 MAD</p>
                <p className="text-slate-600">After probation/hour</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">100 MAD</p>
                <p className="text-slate-600">Top performers/hour</p>
              </div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-6">
              Payments processed monthly via bank transfer
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What qualifications do I need?",
                a: "A Bachelor's degree and a teaching certification (TEFL, TESOL, CELTA, or equivalent). Strong English proficiency is required."
              },
              {
                q: "How does the application process work?",
                a: "Submit your application with CV and intro video. If shortlisted, you'll have a brief interview. Successful candidates complete onboarding before starting."
              },
              {
                q: "When and how do I get paid?",
                a: "Payments are processed monthly via bank transfer."
              },
              {
                q: "What is the minimum time commitment?",
                a: "Flexible. You set your own schedule based on your availability."
              },
              {
                q: "Do I need to prepare my own materials?",
                a: "No. We provide structured curriculum and lesson plans. You focus on teaching."
              },
              {
                q: "Can I teach from anywhere?",
                a: "Yes, as long as you have stable internet, a computer with webcam/mic, and a quiet environment."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-medium text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Application Form</h2>
          <p className="text-slate-600 text-center mb-8">All fields are required</p>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                {['Info', 'Experience', 'Documents', 'Availability'].map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      formStep > i + 1 
                        ? 'bg-emerald-600 text-white' 
                        : formStep === i + 1 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-200 text-slate-500'
                    }`}>
                      {formStep > i + 1 ? '✓' : i + 1}
                    </div>
                    <span className={`ml-2 text-sm hidden sm:block ${formStep === i + 1 ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                      {step}
                    </span>
                    {i < 3 && <div className={`w-8 sm:w-12 h-0.5 mx-2 ${formStep > i + 1 ? 'bg-emerald-600' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Application Submitted!</h3>
                <p className="text-slate-600 mb-4">Thank you for your interest. We'll review your application and contact you within 3-5 business days.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="text-emerald-600 font-medium hover:underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
            <form 
              onSubmit={handleSubmit}
              className="p-6"
            >
              {submitError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {submitError}
                </div>
              )}
              {/* Upload progress UI */}
              {isSubmitting && (
                <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {uploadStage === 'done' ? (
                        <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                      )}
                      <span className="text-sm font-medium text-slate-700">{uploadProgress}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {uploadSize && (uploadStage === 'uploading' || uploadStage === 'processing') && (
                        <span className="text-xs text-slate-500">{uploadSize}</span>
                      )}
                      {elapsedTime && uploadStage !== 'done' && (
                        <span className="text-xs text-emerald-600 font-medium">{elapsedTime}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Animated indeterminate progress bar */}
                  {(uploadStage === 'uploading' || uploadStage === 'processing') && (
                    <div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 animate-pulse"
                          style={{
                            width: '100%',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s ease-in-out infinite',
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-slate-400">
                          {uploadStage === 'uploading' 
                            ? 'Uploading your CV and video... Please keep this page open.' 
                            : 'Saving your application... Almost there!'}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {uploadStage === 'preparing' && (
                    <p className="text-xs text-slate-400">Preparing your files... This may take a moment for large videos.</p>
                  )}
                  
                  {uploadStage === 'done' && (
                    <div className="w-full bg-emerald-100 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full w-full"></div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 1: Personal Info */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.firstName ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.lastName ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+212 6XX XXX XXX"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: Experience */}
              {formStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Teaching Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.experience ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                    {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Certifications</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['TEFL', 'TESOL', 'CELTA', 'Other'].map((cert) => (
                        <label key={cert} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 ${formData.certifications.includes(cert) ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'}`}>
                          <input 
                            type="checkbox" 
                            name="certifications" 
                            value={cert}
                            checked={formData.certifications.includes(cert)}
                            onChange={() => handleCheckbox('certifications', cert)}
                            className="w-4 h-4 text-emerald-600"
                          />
                          <span className="text-sm">{cert}</span>
                        </label>
                      ))}
                    </div>
                    {errors.certifications && <p className="text-red-500 text-xs mt-1">{errors.certifications}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Specialization</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['General English', 'Business English', 'IELTS/TOEFL', 'Kids & Teens'].map((spec) => (
                        <label key={spec} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 ${formData.specialization.includes(spec) ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'}`}>
                          <input 
                            type="checkbox" 
                            name="specialization" 
                            value={spec}
                            checked={formData.specialization.includes(spec)}
                            onChange={() => handleCheckbox('specialization', spec)}
                            className="w-4 h-4 text-emerald-600"
                          />
                          <span className="text-sm">{spec}</span>
                        </label>
                      ))}
                    </div>
                    {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {formStep === 3 && (
                <div className="space-y-6">
                  {/* CV Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">CV/Resume (PDF, DOC)</label>
                    <input
                      type="file"
                      id="cv-upload"
                      name="attachment"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleCvUpload(e.target.files?.[0] || null)}
                      className="sr-only"
                      disabled={cvUpload.status === 'uploading'}
                    />
                    <label 
                      htmlFor="cv-upload"
                      className={`block border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer ${
                      cvUpload.status === 'error' ? 'border-red-300 bg-red-50' :
                      cvUpload.status === 'uploaded' ? 'border-emerald-300 bg-emerald-50' :
                      cvUpload.status === 'uploading' ? 'border-blue-300 bg-blue-50 cursor-wait' :
                      'border-slate-300 hover:border-emerald-400'
                    }`}>
                      
                      {cvUpload.status === 'idle' && (
                        <div className="text-center py-4">
                          <svg className="w-10 h-10 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-sm text-slate-600">Click to upload your CV</p>
                          <p className="text-xs text-slate-400 mt-1">PDF or DOC, max 5MB</p>
                        </div>
                      )}
                      
                      {cvUpload.status === 'uploading' && (
                        <div className="py-2">
                          <div className="flex items-center gap-3 mb-2">
                            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-blue-700 truncate">{cvUpload.file?.name}</p>
                              <p className="text-xs text-blue-600">Uploading... {Math.round(cvUpload.progress)}%</p>
                            </div>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${cvUpload.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {cvUpload.status === 'uploaded' && (
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-emerald-700 truncate">{cvUpload.file?.name}</p>
                            <p className="text-xs text-emerald-600">Uploaded successfully • {((cvUpload.file?.size || 0) / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setCvUpload({ status: 'idle', progress: 0, file: null, base64Data: '', error: '' }); }}
                            className="text-slate-400 hover:text-slate-600 p-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      
                      {cvUpload.status === 'error' && (
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-red-700">{cvUpload.file?.name || 'Upload failed'}</p>
                            <p className="text-xs text-red-600">{cvUpload.error}</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setCvUpload({ status: 'idle', progress: 0, file: null, base64Data: '', error: '' }); }}
                            className="text-red-400 hover:text-red-600 text-sm font-medium"
                          >
                            Retry
                          </button>
                        </div>
                      )}
                    </label>
                    {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
                  </div>
                  
                  {/* Video Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">1-Minute Introduction Video</label>
                    <p className="text-xs text-slate-500 mb-2">Record a short video introducing yourself in English</p>
                    <input
                      type="file"
                      id="video-upload"
                      name="video"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e.target.files?.[0] || null)}
                      className="sr-only"
                      disabled={videoUpload.status === 'uploading'}
                    />
                    <label 
                      htmlFor="video-upload"
                      className={`block border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer ${
                      videoUpload.status === 'error' ? 'border-red-300 bg-red-50' :
                      videoUpload.status === 'uploaded' ? 'border-emerald-300 bg-emerald-50' :
                      videoUpload.status === 'uploading' ? 'border-blue-300 bg-blue-50 cursor-wait' :
                      'border-slate-300 hover:border-emerald-400'
                    }`}>
                      
                      {videoUpload.status === 'idle' && (
                        <div className="text-center py-4">
                          <svg className="w-10 h-10 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm text-slate-600">Click to upload your introduction video</p>
                          <p className="text-xs text-slate-400 mt-1">MP4, MOV, or WebM, max 25MB</p>
                        </div>
                      )}
                      
                      {videoUpload.status === 'uploading' && (
                        <div className="py-2">
                          <div className="flex items-center gap-3 mb-2">
                            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-blue-700 truncate">{videoUpload.file?.name}</p>
                              <p className="text-xs text-blue-600">Uploading... {Math.round(videoUpload.progress)}%</p>
                            </div>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                              style={{ width: `${videoUpload.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {videoUpload.status === 'uploaded' && (
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-emerald-700 truncate">{videoUpload.file?.name}</p>
                            <p className="text-xs text-emerald-600">Uploaded successfully • {((videoUpload.file?.size || 0) / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setVideoUpload({ status: 'idle', progress: 0, file: null, base64Data: '', error: '' }); }}
                            className="text-slate-400 hover:text-slate-600 p-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      
                      {videoUpload.status === 'error' && (
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-red-700">{videoUpload.file?.name || 'Upload failed'}</p>
                            <p className="text-xs text-red-600">{videoUpload.error}</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setVideoUpload({ status: 'idle', progress: 0, file: null, base64Data: '', error: '' }); }}
                            className="text-red-400 hover:text-red-600 text-sm font-medium"
                          >
                            Retry
                          </button>
                        </div>
                      )}
                    </label>
                    {errors.video && <p className="text-red-500 text-xs mt-1">{errors.video}</p>}
                    
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs text-amber-800 font-medium">Tips for faster upload:</p>
                      <ul className="text-xs text-amber-700 mt-1 space-y-1">
                        <li>• Record in 720p instead of 1080p/4K</li>
                        <li>• Keep it under 60 seconds</li>
                        <li>• Use <a href="https://www.freeconvert.com/video-compressor" target="_blank" rel="noopener noreferrer" className="underline">FreeConvert</a> to compress large videos</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={cvUpload.status === 'uploading' || videoUpload.status === 'uploading'}
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {(cvUpload.status === 'uploading' || videoUpload.status === 'uploading') ? 'Uploading...' : 'Continue'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Availability */}
              {formStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Weekly Availability</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={(e) => setFormData({...formData, availability: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.availability ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select hours</option>
                      <option value="10-15">10-15 hours/week</option>
                      <option value="15-25">15-25 hours/week</option>
                      <option value="25+">25+ hours/week</option>
                    </select>
                    {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Schedule</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Mornings', 'Afternoons', 'Evenings', 'Weekends'].map((time) => (
                        <label key={time} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 ${formData.schedule.includes(time) ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'}`}>
                          <input 
                            type="checkbox" 
                            name="schedule" 
                            value={time}
                            checked={formData.schedule.includes(time)}
                            onChange={() => handleCheckbox('schedule', time)}
                            className="w-4 h-4 text-emerald-600"
                          />
                          <span className="text-sm">{time}</span>
                        </label>
                      ))}
                    </div>
                    {errors.schedule && <p className="text-red-500 text-xs mt-1">{errors.schedule}</p>}
                  </div>
                  {uploadProgress && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center gap-2 text-emerald-700">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-medium">{uploadProgress}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              )}
            </form>
            )}
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Applications reviewed within 3-5 business days
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="-my-8">
              <Image src="/logo.png" alt="Takalam" width={400} height={100} className="h-28 w-auto brightness-0 invert" />
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/blog" className="hover:text-white">Blog</Link>
            </div>
            <p className="text-sm">© 2025 Takalam English</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
