"use client";
import React, { useState } from "react";

import {
  Play,
  Pause,
  Plus,
  Settings,
  Eye,
  Code,
  Download,
  Upload,
  Save,
  Copy,
  Trash2,
  Edit3,
  MousePointer,
  Zap,
  Target,
  MessageCircle,
  Video,
  Image,
  Type,
  Palette,
  Layout,
  Monitor,
  Smartphone,
  Tablet,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Info,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

export default function TourBuilderUI() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("desktop");
  const [tourSteps, setTourSteps] = useState([
    {
      id: "1",
      title: "Welcome to Our Platform",
      message:
        "Let's take a quick tour to get you started with all the amazing features we have to offer.",
      selector: "#welcome-section",
      position: "bottom",
      type: "modal",
      delay: 0,
      duration: 5000,
      allowClicksThrough: false,
      showSkip: true,
      showPrevious: false,
      showNext: true,
      customCSS: "",
      media: {
        type: "video",
        url: "https://example.com/welcome-video.mp4",
      },
    },
    {
      id: "2",
      title: "Navigation Menu",
      message:
        "Use this menu to navigate between different sections of the application.",
      selector: "#nav-menu",
      position: "right",
      type: "tooltip",
      delay: 500,
      duration: 3000,
      allowClicksThrough: true,
      showSkip: true,
      showPrevious: true,
      showNext: true,
      customCSS: "",
    },
    {
      id: "3",
      title: "Create New Project",
      message: "Click here to start a new project and begin your journey.",
      selector: "#create-btn",
      position: "top",
      type: "spotlight",
      delay: 0,
      duration: 4000,
      allowClicksThrough: false,
      showSkip: true,
      showPrevious: true,
      showNext: true,
      customCSS: "",
      media: {
        type: "image",
        url: "https://example.com/create-project.png",
      },
    },
  ]);

  const tourTemplates = [
    { name: "Onboarding Flow", steps: 5, category: "User Onboarding" },
    { name: "Feature Discovery", steps: 8, category: "Product Tour" },
    { name: "Quick Start Guide", steps: 3, category: "Getting Started" },
    { name: "Advanced Features", steps: 12, category: "Advanced" },
    { name: "Mobile App Tour", steps: 6, category: "Mobile" },
    { name: "E-commerce Guide", steps: 10, category: "E-commerce" },
  ];

  const stepTypes = [
    {
      value: "tooltip",
      label: "Tooltip",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    { value: "modal", label: "Modal", icon: <Layout className="w-4 h-4" /> },
    {
      value: "highlight",
      label: "Highlight",
      icon: <Target className="w-4 h-4" />,
    },
    {
      value: "spotlight",
      label: "Spotlight",
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  const positions = [
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
  ];

  const themes = [
    { name: "Default", primary: "#3B82F6", secondary: "#F3F4F6" },
    { name: "Dark", primary: "#1F2937", secondary: "#374151" },
    { name: "Purple", primary: "#8B5CF6", secondary: "#F3E8FF" },
    { name: "Green", primary: "#10B981", secondary: "#D1FAE5" },
    { name: "Orange", primary: "#F59E0B", secondary: "#FEF3C7" },
    { name: "Pink", primary: "#EC4899", secondary: "#FCE7F3" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                TourBuilder Pro
              </h1>
            </div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Current Project:</span>
              <span className="text-sm font-medium text-gray-900">
                Welcome Tour
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
              <Save className="w-4 h-4" />
              <span>Save Tour</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Left Sidebar - Tour Steps */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Tour Steps
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Total: {tourSteps.length}
                </span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isPreviewMode
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {isPreviewMode ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isPreviewMode ? "Stop Preview" : "Preview Tour"}</span>
              </button>
            </div>

            {/* Device Selector */}
            <div className="flex items-center space-x-1 mb-4">
              <button
                onClick={() => setSelectedDevice("desktop")}
                className={`p-2 rounded-lg ${
                  selectedDevice === "desktop"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedDevice("tablet")}
                className={`p-2 rounded-lg ${
                  selectedDevice === "tablet"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedDevice("mobile")}
                className={`p-2 rounded-lg ${
                  selectedDevice === "mobile"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Steps List */}
          <div className="p-4 space-y-3">
            {tourSteps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  activeStep === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        activeStep === index
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {step.title}
                    </span>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {step.message}
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      step.type === "modal"
                        ? "bg-purple-100 text-purple-700"
                        : step.type === "tooltip"
                        ? "bg-blue-100 text-blue-700"
                        : step.type === "highlight"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {step.type}
                  </span>
                  <span className="text-xs text-gray-500">{step.position}</span>
                  {step.media && (
                    <div className="flex items-center space-x-1">
                      {step.media.type === "video" ? (
                        <Video className="w-3 h-3 text-gray-400" />
                      ) : (
                        <Image className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Step Button */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50">
              <Plus className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">
                Add New Step
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Preview Area */}
          <div className="flex-1 bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg h-full">
              {/* Preview Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Code className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Settings className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mock Website Preview */}
              <div className="p-6 h-full">
                <div className="bg-gray-50 rounded-lg p-8 h-full relative">
                  {/* Mock Navigation */}
                  <div
                    id="nav-menu"
                    className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 rounded"></div>
                      <span className="font-semibold">Company Logo</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <a href="#" className="text-gray-700 hover:text-blue-600">
                        Home
                      </a>
                      <a href="#" className="text-gray-700 hover:text-blue-600">
                        Products
                      </a>
                      <a href="#" className="text-gray-700 hover:text-blue-600">
                        About
                      </a>
                      <a href="#" className="text-gray-700 hover:text-blue-600">
                        Contact
                      </a>
                    </div>
                  </div>

                  {/* Mock Content */}
                  <div id="welcome-section" className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      Welcome to Our Platform
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                      Discover amazing features that will transform your
                      workflow and boost your productivity.
                    </p>
                    <button
                      id="create-btn"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Create New Project
                    </button>
                  </div>

                  {/* Mock Cards */}
                  <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-white p-6 rounded-lg shadow-sm"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Feature {i}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tour Step Preview Overlay */}
                  {isPreviewMode && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {tourSteps[activeStep]?.title}
                          </h4>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {tourSteps[activeStep]?.message}
                        </p>
                        {tourSteps[activeStep]?.media && (
                          <div className="mb-4">
                            {tourSteps[activeStep]?.media?.type === "video" ? (
                              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Video className="w-8 h-8 text-gray-400" />
                              </div>
                            ) : (
                              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Image className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {activeStep + 1} of {tourSteps.length}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                              Skip
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Step Configuration */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Step Configuration
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Configure step {activeStep + 1} of {tourSteps.length}
              </p>
            </div>

            <div className="p-4 space-y-6">
              {/* Basic Settings */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Basic Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Step Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={tourSteps[activeStep]?.title || ""}
                      placeholder="Enter step title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Message
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      value={tourSteps[activeStep]?.message || ""}
                      placeholder="Enter message to display to users"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CSS Selector
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={tourSteps[activeStep]?.selector || ""}
                      placeholder="#element-id or .class-name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Step Type
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {stepTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {positions.map((pos) => (
                          <option key={pos.value} value={pos.value}>
                            {pos.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Settings */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Media
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">None</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="gif">GIF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/media.mp4"
                    />
                  </div>

                  <button className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50">
                    <Upload className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">
                      Upload Media
                    </span>
                  </button>
                </div>
              </div>

              {/* Timing Settings */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Timing
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delay (ms)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={tourSteps[activeStep]?.delay || 0}
                        min="0"
                        step="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (ms)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={tourSteps[activeStep]?.duration || 0}
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Button Settings */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Button Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Show Skip Button
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={tourSteps[activeStep]?.showSkip}
                      />
                      <div className="w-10 h-6 bg-gray-200 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-1 translate-y-1"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Show Previous Button
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={tourSteps[activeStep]?.showPrevious}
                      />
                      <div className="w-10 h-6 bg-gray-200 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-1 translate-y-1"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Show Next Button
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={tourSteps[activeStep]?.showNext}
                      />
                      <div className="w-10 h-6 bg-blue-600 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-5 translate-y-1"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Allow Clicks Through
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={tourSteps[activeStep]?.allowClicksThrough}
                      />
                      <div className="w-10 h-6 bg-gray-200 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-1 translate-y-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom CSS */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Custom CSS
                </h3>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows={4}
                  placeholder=".tour-step { /* Custom styles */ }"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Tour Templates */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Tour Templates
                </h3>
                <div className="space-y-2">
                  {tourTemplates.map((template, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {template.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {template.steps} steps
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {template.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme Customization */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Theme Customization
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((theme, index) => (
                    <div
                      key={index}
                      className="p-2 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        ></div>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        ></div>
                      </div>
                      <p className="text-xs font-medium text-gray-700">
                        {theme.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics & Testing */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Analytics & Testing
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Completion Rate
                      </p>
                      <p className="text-xs text-gray-600">
                        Average user completion
                      </p>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      87%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Drop-off Rate
                      </p>
                      <p className="text-xs text-gray-600">
                        Users who skip the tour
                      </p>
                    </div>
                    <span className="text-lg font-bold text-orange-600">
                      13%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Avg. Time
                      </p>
                      <p className="text-xs text-gray-600">
                        Time to complete tour
                      </p>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      2.4m
                    </span>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Advanced Settings
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="all">All Users</option>
                      <option value="new">New Users Only</option>
                      <option value="returning">Returning Users Only</option>
                      <option value="premium">Premium Users</option>
                      <option value="free">Free Users</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trigger Condition
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="page-load">On Page Load</option>
                      <option value="user-action">After User Action</option>
                      <option value="time-delay">After Time Delay</option>
                      <option value="scroll">On Scroll Position</option>
                      <option value="element-visible">
                        When Element Visible
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="once">Show Once</option>
                      <option value="session">Once Per Session</option>
                      <option value="daily">Once Per Day</option>
                      <option value="weekly">Once Per Week</option>
                      <option value="always">Every Visit</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Enable A/B Testing
                    </label>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-10 h-6 bg-gray-200 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-1 translate-y-1"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Track Analytics
                    </label>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-10 h-6 bg-blue-600 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-5 translate-y-1"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Auto-advance Steps
                    </label>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-10 h-6 bg-gray-200 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-1 translate-y-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration Settings */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Integrations
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Google Analytics
                      </span>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600">
                          Connected
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Track tour events and user behavior
                    </p>
                  </div>

                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Mixpanel
                      </span>
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-xs text-orange-600">Pending</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Advanced user journey tracking
                    </p>
                  </div>

                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Segment
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                        <span className="text-xs text-gray-500">
                          Not Connected
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Send tour data to multiple tools
                    </p>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Export Options
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    <Code className="w-4 h-4 text-gray-600" />
                    <span>Export as JavaScript</span>
                  </button>

                  <button className="w-full flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    <Download className="w-4 h-4 text-gray-600" />
                    <span>Export as JSON</span>
                  </button>

                  <button className="w-full flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    <Copy className="w-4 h-4 text-gray-600" />
                    <span>Copy Embed Code</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Tour Ready</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-600">
              Last saved: 2 minutes ago
            </span>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-600">Auto-save enabled</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {tourSteps.length} steps configured
              </span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Documentation
            </button>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Get Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
