import React, { useState, useRef, useEffect } from 'react'
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Users, Settings, Languages, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'

const VideoCall: React.FC = () => {
    const [isVideoOn, setIsVideoOn] = useState(true)
    const [isAudioOn, setIsAudioOn] = useState(true)
    const [isInCall, setIsInCall] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('English')
    const [targetLanguage, setTargetLanguage] = useState('Urdu')
    const [isTranslating, setIsTranslating] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState('Disconnected')
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const [callDuration, setCallDuration] = useState(0)

    const languages = [
        'English', 'Urdu', 'Chinese', 'Spanish', 'French', 'German', 'Japanese',
        'Arabic', 'Hindi', 'Portuguese', 'Russian', 'Korean', 'Italian', 'Dutch'
    ]

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isInCall) {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isInCall])

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const startCall = async () => {
        setIsInCall(true)
        setConnectionStatus('Connecting...')
        await initializeVideo()
        setTimeout(() => {
            setConnectionStatus('Connected')
            setIsTranslating(true)
        }, 2000)
    }

    const endCall = () => {
        setIsInCall(false)
        setIsTranslating(false)
        setConnectionStatus('Disconnected')
        setCallDuration(0)
        // Clean up video streams and WebRTC connections
        if (localVideoRef.current?.srcObject) {
            const stream = localVideoRef.current.srcObject as MediaStream
            stream.getTracks().forEach(track => track.stop())
        }
    }

    const initializeVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream
            }
        } catch (error) {
            console.error('Error accessing media devices:', error)
        }
    }

    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn)
        if (localVideoRef.current?.srcObject) {
            const stream = localVideoRef.current.srcObject as MediaStream
            const videoTrack = stream.getVideoTracks()[0]
            if (videoTrack) {
                videoTrack.enabled = !isVideoOn
            }
        }
    }

    const toggleAudio = () => {
        setIsAudioOn(!isAudioOn)
        if (localVideoRef.current?.srcObject) {
            const stream = localVideoRef.current.srcObject as MediaStream
            const audioTrack = stream.getAudioTracks()[0]
            if (audioTrack) {
                audioTrack.enabled = !isAudioOn
            }
        }
    }

    const toggleTranslation = () => {
        setIsTranslating(!isTranslating)
        if (!isTranslating) {
            // Start translation service
            setIsListening(true)
            console.log(`Starting translation from ${selectedLanguage} to ${targetLanguage}`)
        } else {
            setIsListening(false)
            setIsSpeaking(false)
        }
    }

    // Simulate voice translation activity
    useEffect(() => {
        if (isTranslating && isInCall) {
            const interval = setInterval(() => {
                setIsListening(prev => !prev)
                setTimeout(() => {
                    setIsSpeaking(prev => !prev)
                }, 1000)
            }, 4000)
            return () => clearInterval(interval)
        }
    }, [isTranslating, isInCall])

    return (
        <div className="min-h-screen bg-[#FFF7F0] dark:bg-[#002B5B] p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg mb-6 p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[#002B5B] dark:text-white mb-2">
                                VoiceLink Video Call
                            </h1>
                            <p className="text-[#444] dark:text-[#cfd8e3]">
                                Connect with anyone, anywhere, in any language • {connectionStatus}
                                {isInCall && <span className="ml-2 text-[#FF6B00] font-semibold">• {formatDuration(callDuration)}</span>}
                            </p>
                        </div>

                        {/* Translation Settings */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col">
                                <label className="text-xs font-medium text-[#444] dark:text-[#cfd8e3] mb-1">Your Language</label>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="px-3 py-2 border border-[#FF9F1C] rounded-lg focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white text-sm"
                                    disabled={isInCall}
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs font-medium text-[#444] dark:text-[#cfd8e3] mb-1">Translate To</label>
                                <select
                                    value={targetLanguage}
                                    onChange={(e) => setTargetLanguage(e.target.value)}
                                    className="px-3 py-2 border border-[#FF9F1C] rounded-lg focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white text-sm"
                                    disabled={isInCall}
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Call Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Video Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg p-6">
                            <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden mb-4">
                                {/* Remote Video */}
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                    poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTExODI3Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM0Qjc2ODgiLz4KPHN2Zz4="
                                />

                                {/* Local Video - Picture in Picture */}
                                <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover"
                                    />
                                    {!isVideoOn && (
                                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                            <VideoOff className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Translation Status */}
                                {isTranslating && isInCall && (
                                    <div className="absolute top-4 left-4 space-y-2">
                                        <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-lg">
                                            <Languages size={16} />
                                            {selectedLanguage} ↔ {targetLanguage}
                                        </div>
                                        {isListening && (
                                            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-lg animate-pulse">
                                                <Mic size={14} />
                                                Listening...
                                            </div>
                                        )}
                                        {isSpeaking && (
                                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-lg animate-pulse">
                                                <Volume2 size={14} />
                                                Speaking...
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!isInCall && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
                                        <div className="text-center">
                                            <Video className="w-16 h-16 text-white mx-auto mb-4" />
                                            <p className="text-white text-lg mb-2">Ready to start your call</p>
                                            <p className="text-gray-300 text-sm mb-6">
                                                Selected: {selectedLanguage} → {targetLanguage}
                                            </p>
                                            <Button
                                                onClick={startCall}
                                                className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white px-8 py-4 rounded-lg hover:brightness-110 transition-all duration-200 text-lg font-semibold shadow-lg"
                                            >
                                                <Phone className="w-6 h-6 mr-3" />
                                                Start Call
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Call Controls */}
                            <div className="flex justify-center items-center gap-4">
                                <Button
                                    onClick={toggleVideo}
                                    className={`p-4 rounded-full shadow-lg ${isVideoOn
                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        : 'bg-red-500 text-white hover:bg-red-600'
                                        }`}
                                    disabled={!isInCall}
                                >
                                    {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
                                </Button>

                                <Button
                                    onClick={toggleAudio}
                                    className={`p-4 rounded-full shadow-lg ${isAudioOn
                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        : 'bg-red-500 text-white hover:bg-red-600'
                                        }`}
                                    disabled={!isInCall}
                                >
                                    {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
                                </Button>

                                <Button
                                    onClick={toggleTranslation}
                                    className={`p-4 rounded-full shadow-lg ${isTranslating
                                        ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white hover:brightness-110'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    disabled={!isInCall}
                                >
                                    <Languages size={24} />
                                </Button>

                                {isInCall && (
                                    <Button
                                        onClick={endCall}
                                        className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-lg"
                                    >
                                        <PhoneOff size={24} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Call Status */}
                        <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-[#002B5B] dark:text-white mb-4">Call Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#444] dark:text-[#cfd8e3]">Connection</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${connectionStatus === 'Connected' ? 'bg-green-100 text-green-600' :
                                            connectionStatus === 'Connecting...' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>
                                        {connectionStatus}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#444] dark:text-[#cfd8e3]">Translation</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isTranslating ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {isTranslating ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#444] dark:text-[#cfd8e3]">Audio Quality</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">HD</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#444] dark:text-[#cfd8e3]">Video Quality</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">720p</span>
                                </div>
                            </div>
                        </div>

                        {/* Translation Activity */}
                        {isTranslating && (
                            <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-[#002B5B] dark:text-white mb-4 flex items-center">
                                    <Languages className="mr-2 text-[#FF6B00]" size={18} />
                                    Translation Activity
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="font-medium">Speech Recognition</span>
                                        </div>
                                        <p className="text-[#444] dark:text-[#cfd8e3]">Listening for {selectedLanguage} speech...</p>
                                    </div>
                                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="font-medium">Translation</span>
                                        </div>
                                        <p className="text-[#444] dark:text-[#cfd8e3]">Converting to {targetLanguage}...</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Participants */}
                        <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-[#002B5B] dark:text-white mb-4 flex items-center">
                                <Users className="mr-2" size={18} />
                                Participants ({isInCall ? '2' : '1'})
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 p-2 rounded-lg bg-[#FFF7F0] dark:bg-[#223355]">
                                    <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        You
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#002B5B] dark:text-white text-sm">You</p>
                                        <p className="text-xs text-[#444] dark:text-[#cfd8e3]">{selectedLanguage}</p>
                                    </div>
                                </div>
                                {isInCall && (
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-[#FFF7F0] dark:bg-[#223355]">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                            U2
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#002B5B] dark:text-white text-sm">Remote User</p>
                                            <p className="text-xs text-[#444] dark:text-[#cfd8e3]">{targetLanguage}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Settings */}
                        <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-[#002B5B] dark:text-white mb-4 flex items-center">
                                <Settings className="mr-2" size={18} />
                                Quick Settings
                            </h3>
                            <div className="space-y-2">
                                <button className="w-full text-left px-3 py-2 text-[#444] dark:text-[#cfd8e3] hover:bg-[#FFF7F0] dark:hover:bg-[#223355] rounded-lg transition-colors text-sm">
                                    Audio Settings
                                </button>
                                <button className="w-full text-left px-3 py-2 text-[#444] dark:text-[#cfd8e3] hover:bg-[#FFF7F0] dark:hover:bg-[#223355] rounded-lg transition-colors text-sm">
                                    Video Settings
                                </button>
                                <button className="w-full text-left px-3 py-2 text-[#444] dark:text-[#cfd8e3] hover:bg-[#FFF7F0] dark:hover:bg-[#223355] rounded-lg transition-colors text-sm">
                                    Translation Settings
                                </button>
                                <button className="w-full text-left px-3 py-2 text-[#444] dark:text-[#cfd8e3] hover:bg-[#FFF7F0] dark:hover:bg-[#223355] rounded-lg transition-colors text-sm">
                                    Network Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCall
