"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Dumbbell, ArrowRight, Briefcase, Bot, PlayCircle, ArrowDown, 
    Circle, Zap, Clock, Users, DollarSign, Play, ArrowLeftRight, 
    Pause, CheckCircle2, MoveHorizontal, Sparkles, XCircle, 
    CalendarCheck, Trophy, Check, X, ShoppingCart, Info, AlertCircle 
} from 'lucide-react';

export default function ResistFitApp() {
    // --- State Management ---
    
    // Video Demo State
    const [videoState, setVideoState] = useState<'cover' | 'playing' | 'completed'>('cover');
    const [timeLeft, setTimeLeft] = useState(180);
    const [isPaused, setIsPaused] = useState(false);

    // Before/After Slider State
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    // AI Coach State
    const [aiWeight, setAiWeight] = useState<number>(78);
    const [aiHeight, setAiHeight] = useState<number>(175);
    const [aiGoal, setAiGoal] = useState('Fat Loss');
    const [aiResult, setAiResult] = useState<{ show: boolean; loading: boolean; text: string; kcal: number; protein: number }>({
        show: false, loading: false, text: '', kcal: 0, protein: 0
    });

    // Gamification State
    const [streakDays, setStreakDays] = useState<number[]>([1, 2, 3, 4, 5, 6]);

    // Modal States
    const [modals, setModals] = useState({
        checkout: false,
        alert: false,
        selectedPlan: '',
        alertTitle: '',
        alertMessage: '',
        alertSuccess: true,
    });
    const [checkoutForm, setCheckoutForm] = useState({ name: '', phone: '' });

    // --- Video Simulation Logic ---
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (videoState === 'playing' && !isPaused && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 100); // Speed up slightly for simulation
        } else if (timeLeft <= 0) {
            setVideoState('completed');
        }
        return () => clearInterval(timer);
    }, [videoState, isPaused, timeLeft]);

    const videoProgress = ((180 - timeLeft) / 180) * 100;
    const kcalBurned = Math.floor((180 - timeLeft) * 0.15);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (videoState === 'cover') {
            setVideoState('playing');
            setTimeLeft(180);
            setIsPaused(false);
        } else if (videoState === 'playing') {
            setIsPaused(!isPaused);
        } else if (videoState === 'completed') {
            setVideoState('playing');
            setTimeLeft(180);
            setIsPaused(false);
        }
    };

    let videoTip = '雙腳踩彈力帶，手肘往後拉至肩胛收緊';
    if (videoState === 'playing') {
        if (isPaused) videoTip = '已暫停。客到先忙，客走即刻撳播放繼續！';
        else if (timeLeft <= 60) videoTip = '最後一組！感覺肩膀斜方肌正在放鬆';
        else if (timeLeft <= 120) videoTip = 'AI 貼士：臀部收緊，重心放在腳後跟';
        else videoTip = 'AI 貼士：切勿聳肩，保持腹部收緊';
    }

    // --- Before/After Slider Logic ---
    const handleSliderMove = useCallback((clientX: number) => {
        if (!sliderContainerRef.current) return;
        const rect = sliderContainerRef.current.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        let percentage = (offsetX / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        setSliderPos(percentage);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) handleSliderMove(e.clientX);
        };
        const handleMouseUp = () => setIsDragging(false);
        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging) handleSliderMove(e.touches[0].clientX);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, handleSliderMove]);

    // --- AI Coaching Logic ---
    const showAlert = (title: string, message: string, success: boolean = true) => {
        setModals(prev => ({ ...prev, alert: true, alertTitle: title, alertMessage: message, alertSuccess: success }));
    };

    const generateAICoaching = async () => {
        if (!aiWeight || !aiHeight) {
            showAlert("輸入未完善", "請先輸入身高與體重！", false);
            return;
        }

        // Local Instant calculation
        let calculatedKcal = 0;
        let calculatedProtein = 0;

        if (aiGoal.includes('Fat Loss')) {
            calculatedKcal = Math.floor((aiWeight * 22) + 200);
            calculatedProtein = Math.floor(aiWeight * 1.8);
        } else if (aiGoal.includes('Muscle Gain')) {
            calculatedKcal = Math.floor((aiWeight * 25) + 400);
            calculatedProtein = Math.floor(aiWeight * 2.0);
        } else {
            calculatedKcal = Math.floor((aiWeight * 22) + 100);
            calculatedProtein = Math.floor(aiWeight * 1.5);
        }

        setAiResult({
            show: true,
            loading: true,
            text: '',
            kcal: calculatedKcal,
            protein: calculatedProtein
        });

        const systemPrompt = "你是一位專為忙碌的28-30歲以上男性地產經紀（物業代理）設計碎片時間健身方案的AI教練。你需要使用繁體中文、融合廣東話/香港用語（例：『坐舖』、『示範單位』、『Call客』『客』、『開單』、『碎片時間』）來回答。語氣要專業、積極、簡潔。";
        const userPrompt = `學員資料：身高 ${aiHeight}cm, 體重 ${aiWeight}kg, 運動目標是：${aiGoal}。請為他：1. 推薦一個可在地產分行內或睇樓空檔（10分鐘內）完成的「彈力帶超簡易新手菜單」。2. 給予經紀久企、久坐的緩解指南。3. 用簡約易看的方式排列（多用Emoji）。`;

        const apiKey = ""; // Will be injected by Canvas env
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("API Error");

            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

            setAiResult(prev => ({ ...prev, loading: false, text: text || '生成失敗，請重試。' }));
        } catch (error) {
            console.error("Gemini API Error", error);
            // Fallback
            setAiResult(prev => ({
                ...prev,
                loading: false,
                text: `【AI Coach 離線版備用方案】\n\n📌 經紀專屬10分鐘分行彈力帶菜單：\n\n1. 椅子坐姿划船 (拉背) - 15次 x 3組 (舒緩久坐曲背)\n2. 踩彈力帶站姿推肩 - 12次 x 3組 (改善企太久無力)\n\n💡 經紀貼心提示：\n- 每次 Call 客或聽落單時，可將彈力帶踩於腳底，手抓兩端保持張力，進行低阻力拉伸。\n- 連續企 1 個鐘記得做 30 秒髖關節轉動。`
            }));
        }
    };

    // --- Streak Logic ---
    const toggleStreak = (day: number) => {
        if (!streakDays.includes(day)) {
            setStreakDays([...streakDays, day]);
        }
    };

    // --- Checkout Logic ---
    const handleCheckoutSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setModals(prev => ({ ...prev, checkout: false }));
        showAlert(
            "預約成功", 
            `🎉 恭喜 ${checkoutForm.name}！您已成功預約：【${modals.selectedPlan}】。我們的1:1教練將在1小時內以手機號碼 ${checkoutForm.phone} 通過 WhatsApp 聯絡您，安排首套彈力帶的寄送與開通權限！`
        );
        setCheckoutForm({ name: '', phone: '' });
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#2C3E50] font-sans antialiased overflow-x-hidden">
            <style dangerouslySetInnerHTML={{__html: `
                .premium-shadow { box-shadow: 0 10px 30px -10px rgba(44, 62, 80, 0.08); }
                .glow-green { box-shadow: 0 10px 30px -5px rgba(46, 204, 113, 0.15); }
                .glow-orange { box-shadow: 0 10px 30px -5px rgba(230, 126, 34, 0.15); }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #FAFAFA; }
                ::-webkit-scrollbar-thumb { background: #2C3E50; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #2ECC71; }
            `}} />

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-[#2C3E50] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#2ECC71] rounded-xl flex items-center justify-center shadow-md">
                                <Dumbbell className="text-[#2C3E50]" size={20} strokeWidth={3} />
                            </div>
                            <div>
                                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">Resist<span className="text-[#2ECC71]">Fit</span></span>
                                <span className="block text-[9px] text-[#2ECC71] tracking-widest uppercase font-bold">Anytime Anywhere</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#painpoints" className="text-white/80 hover:text-[#2ECC71] transition text-sm font-semibold">經紀煩惱</a>
                            <a href="#concept" className="text-white/80 hover:text-[#2ECC71] transition text-sm font-semibold">隨時訓練</a>
                            <a href="#demo" className="text-white/80 hover:text-[#2ECC71] transition text-sm font-semibold">3分鐘試玩</a>
                            <a href="#transformation" className="text-white/80 hover:text-[#2ECC71] transition text-sm font-semibold">成果見證</a>
                            <a href="#aicoach" className="text-white/80 hover:text-[#2ECC71] transition text-sm font-semibold">AI 飲食計算</a>
                            <a href="#pricing" className="text-white/80 hover:text-[#2ECC71] transition text-sm font-semibold">方案價格</a>
                        </div>
                        <div>
                            <a href="#pricing" className="px-5 py-2.5 bg-[#E67E22] hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg text-sm flex items-center gap-2">
                                <span>立即起步</span>
                                <ArrowRight size={14} strokeWidth={3} />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="painpoints" className="relative py-12 lg:py-24 overflow-hidden bg-[#FAFAFA]">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#2ECC71]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#E67E22]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5E9] border border-[#2ECC71]/20">
                                <span className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse"></span>
                                <span className="text-xs text-[#2C3E50] font-semibold">專為28-35歲+ 地產從業員設計</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight text-[#2C3E50]">
                                生活<span className="underline decoration-[#E67E22] decoration-wavy decoration-2">冇時間運動</span>？<br/>
                                開單忙、坐舖悶？
                            </h1>
                            
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                                日日喺舖頭等客、Call客、企足一日，收工攰到根本去唔到Gym Room？<br/>
                                你需要嘅唔係昂貴年卡，而係一套<span className="text-[#2ECC71] font-bold">放喺食晏、坐舖、碎片時間</span>就可以練，唔阻做嘢又有AI與真人PT雙重加持嘅彈力帶神級方案！
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="flex items-center gap-3 p-4 bg-[#E8F5E9] border border-[#2ECC71]/25 rounded-2xl">
                                    <Briefcase className="text-[#2ECC71]" size={24} />
                                    <div>
                                        <h4 className="text-sm font-bold text-[#2C3E50]">隨時隨地</h4>
                                        <p className="text-[11px] text-slate-500">10分鐘碎片時間救星</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-[#FDF2E9] border border-[#E67E22]/25 rounded-2xl">
                                    <Bot className="text-[#E67E22]" size={24} />
                                    <div>
                                        <h4 className="text-sm font-bold text-[#2C3E50]">AI 智能指導</h4>
                                        <p className="text-[11px] text-slate-500">免下載，計Protein卡路里</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                                <a href="#demo" className="px-8 py-4 bg-[#E67E22] hover:bg-orange-600 text-white font-extrabold text-center rounded-2xl transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3 glow-orange">
                                    <PlayCircle size={20} />
                                    <span>試玩3分鐘影片訓練</span>
                                </a>
                                <a href="#aicoach" className="px-8 py-4 bg-white hover:bg-slate-50 border-2 border-[#2C3E50] text-[#2C3E50] font-bold text-center rounded-2xl transition flex items-center justify-center gap-2">
                                    <span>AI 專屬熱量估算</span>
                                    <ArrowDown size={14} />
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative">
                            <div className="w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden border border-slate-200 bg-white relative premium-shadow group">
                                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop')", opacity: 0.85}}></div>
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/90 via-[#2C3E50]/20 to-transparent flex flex-col justify-between p-6">
                                    <div className="flex justify-between items-start">
                                        <span className="px-3 py-1 bg-[#E67E22] text-[11px] font-black tracking-wider uppercase rounded text-white">ResistFit</span>
                                        <span className="text-xs font-mono text-white bg-[#2C3E50] px-2 py-1 rounded border border-white/20 flex items-center">
                                            <Circle className="text-red-500 w-2 h-2 mr-1.5 animate-pulse fill-red-500" /> LIVE DEMO
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="w-16 h-16 rounded-full bg-[#2ECC71]/20 border-2 border-[#2ECC71] flex items-center justify-center mx-auto mb-4 animate-bounce">
                                            <Zap className="text-[#2ECC71]" size={28} />
                                        </div>
                                        <div className="text-center text-white">
                                            <p className="text-xs text-[#2ECC71] font-black tracking-widest uppercase">Anytime Anywhere</p>
                                            <h3 className="text-xl font-bold text-white">「企足全日、久坐腰酸？」</h3>
                                            <p className="text-xs text-white/80">專為舖頭辦公椅設計的拉伸彈力操</p>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-100 p-3 rounded-xl flex items-center justify-between shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <img src="https://placehold.co/100x100/2ecc71/ffffff?text=PT" alt="PT" className="w-8 h-8 rounded-full border border-[#2ECC71]" />
                                            <div>
                                                <h5 className="text-xs font-bold text-[#2C3E50]">PT Gary (物理治療師資歷)</h5>
                                                <p className="text-[10px] text-slate-500">「髖關節與胸椎訓練」</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-[#2C3E50] font-bold bg-[#E8F5E9] px-2 py-0.5 rounded"> remarks (3)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slogan */}
            <section className="bg-[#E8F5E9] py-10 border-y border-[#2ECC71]/10">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
                    <h2 className="text-3xl sm:text-5xl font-black tracking-wider text-[#E67E22]">
                        ANYTIME, ANYWHERE.
                    </h2>
                    <p className="text-sm sm:text-base text-[#2C3E50] font-semibold max-w-2xl mx-auto">
                        一部電話、一條特製彈力帶。地產舖、示範單位、等客空檔，都是你的私人健身房。
                    </p>
                </div>
            </section>

            {/* Painpoint 2 */}
            <section id="concept" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#2C3E50]">去 Gym Room 到底有幾麻煩？</h2>
                        <p className="text-sm sm:text-base text-slate-500 mt-2">傳統健身房的隱形成本，往往是消磨你熱情的最大殺手：</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#FAFAFA] p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-[#2ECC71]/50 transition duration-300 premium-shadow space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-[#FDF2E9] flex items-center justify-center text-[#E67E22]">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#2C3E50]">1. 時間成本超高</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                執衫、出發、塞車、換衫、沖涼、返歸。前後最少浪費 2 個鐘，對於隨時要企定定、聽電話帶睇樓嘅經紀黎講，根本奢侈。
                            </p>
                        </div>
                        <div className="bg-[#FAFAFA] p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-[#2ECC71]/50 transition duration-300 premium-shadow space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-[#FDF2E9] flex items-center justify-center text-[#E67E22]">
                                <Users size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#2C3E50]">2. 放工時間迫爆</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                7 點收工入去Gym房人山人海，一部機有三個人等。你想快快手練完，結果等機等咗大半個鐘，浪費寶貴時間。
                            </p>
                        </div>
                        <div className="bg-[#FAFAFA] p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-[#2ECC71]/50 transition duration-300 premium-shadow space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-[#FDF2E9] flex items-center justify-center text-[#E67E22]">
                                <DollarSign size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#2C3E50]">3. 被迫簽長期合約</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                PT日捽夜捽叫你買堂、簽長約。最後工作忙碌，一個月去唔到兩次，白白每個月交月費，壓力反而更大。
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 p-6 sm:p-8 bg-[#E8F5E9] border border-[#2ECC71]/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-[#2C3E50]">💡 我們提供的新手友善方案：</h3>
                            <p className="text-sm text-slate-600 max-w-2xl">
                                一整套「彈力帶高畫質影片教學」+「AI 智能精準營養引導」+「1:1 兩大認證 PT 輪班無縫記錄跟進（Advance/Premium）」，直接在分行、家裡或睇樓空檔，善用 10-15 分鐘碎片時間累積高回報成效。
                            </p>
                        </div>
                        <a href="#demo" className="px-6 py-3 bg-[#2ECC71] hover:bg-emerald-600 text-white font-black rounded-xl transition whitespace-nowrap shadow-md">
                            解鎖影片體驗
                        </a>
                    </div>
                </div>
            </section>

            {/* Video Player */}
            <section id="demo" className="py-16 bg-[#FAFAFA] relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-10">
                        <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] text-xs font-black tracking-widest uppercase rounded">3-Minute Teaser</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#2C3E50]">試玩 3 分鐘地產經紀「坐舖舒緩」彈力操</h2>
                        <p className="text-sm text-slate-500 max-w-xl mx-auto">點擊下方按鈕，開始模擬跟做，體驗高效碎片運動！</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl relative glow-green">
                        <div className="aspect-video w-full bg-[#2C3E50] flex flex-col items-center justify-center relative p-4 overflow-hidden">
                            
                            {videoState === 'cover' && (
                                <div className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center p-6 z-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop')"}}>
                                    <div className="absolute inset-0 bg-[#2C3E50]/70"></div>
                                    <button onClick={handlePlayPause} className="w-20 h-20 sm:w-24 sm:h-24 bg-[#E67E22] hover:bg-orange-500 text-white rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110 z-30">
                                        <Play size={40} className="ml-2" />
                                    </button>
                                    <p className="mt-4 text-white text-base sm:text-lg font-bold z-30 text-center">經紀舒緩肩膀及下腰：3分鐘彈力帶跟做</p>
                                    <span className="mt-1 text-xs text-white font-mono z-30 bg-[#E67E22] px-2 py-1 rounded">難度：★☆☆☆☆ (適合無運動基礎者)</span>
                                </div>
                            )}

                            {videoState === 'playing' && (
                                <div className="w-full h-full flex flex-col justify-between z-10 relative">
                                    <div className="flex justify-between items-center text-xs bg-white/95 p-3 rounded-xl border border-slate-200 shadow-md text-[#2C3E50]">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                            <span className="font-bold">當前動作：彈力帶站立划船 (後背激活)</span>
                                        </div>
                                        <span className="text-[#2ECC71] font-mono font-bold">{formatTime(timeLeft)}</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center py-6 sm:py-12 space-y-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 w-32 h-32 bg-[#2ECC71]/15 rounded-full animate-ping mx-auto"></div>
                                            <div className="w-32 h-32 rounded-full border-4 border-[#2ECC71] flex items-center justify-center bg-white relative shadow-lg">
                                                <ArrowLeftRight className="text-[#2ECC71] animate-pulse" size={40} />
                                            </div>
                                        </div>
                                        <div className="text-center text-white">
                                            <p className="text-sm">{isPaused ? "已暫停" : "雙腳踩彈力帶，手肘往後拉至肩胛收緊"}</p>
                                            <span className="text-xs text-[#E67E22] font-bold bg-white/10 px-3 py-1 rounded inline-block mt-2">{videoTip}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 bg-[#2C3E50]/80 p-4 rounded-xl">
                                        <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-[#2ECC71] h-full transition-all duration-1000" style={{width: `${videoProgress}%`}}></div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-white">
                                            <button onClick={handlePlayPause} className="text-[#2ECC71] hover:text-white font-bold flex items-center gap-1">
                                                {isPaused ? <Play size={14}/> : <Pause size={14}/>} {isPaused ? "繼續" : "暫停"}
                                            </button>
                                            <span>已消耗：<strong className="text-[#E67E22]">{kcalBurned}</strong> kcal</span>
                                            <span className="text-white/60">解鎖完整版：上肢20課、下肢20課</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {videoState === 'completed' && (
                                <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 sm:p-12 z-20 text-center space-y-6">
                                    <div className="w-16 h-16 rounded-full bg-[#E8F5E9] border border-[#2ECC71] flex items-center justify-center text-[#2ECC71]">
                                        <CheckCircle2 size={36} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-[#2C3E50]">🎉 恭喜完成 3 分鐘新手體驗！</h3>
                                        <p className="text-sm text-slate-600 max-w-md">你剛才已有效激活背部肌群並舒緩了久坐壓力。這就是我們 100+ 堂碎片時間彈力操的威力！</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={handlePlayPause} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#2C3E50] text-xs font-bold rounded-xl transition border border-slate-200">重新播放</button>
                                        <a href="#pricing" className="px-6 py-2.5 bg-[#E67E22] hover:bg-orange-600 text-white font-black text-xs rounded-xl transition shadow-md">解鎖全系列訓練</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Transformation Slider */}
            <section id="transformation" className="py-16 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-12">
                        <span className="px-3 py-1 bg-[#FDF2E9] text-[#E67E22] text-xs font-black tracking-widest uppercase rounded">PROVEN RESULTS</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50]">看看同行的蜕變成果</h2>
                        <p className="text-sm text-slate-500 max-w-lg mx-auto">真實學員：31歲地產經紀 Anson，利用行街、坐舖時間配合彈力帶，12週減脂增肌。</p>
                    </div>

                    <div 
                        ref={sliderContainerRef}
                        className="relative w-full aspect-[4/3] max-w-2xl mx-auto rounded-3xl overflow-hidden border-4 border-slate-200 shadow-xl select-none"
                        onMouseDown={(e) => { setIsDragging(true); handleSliderMove(e.clientX); }}
                        onTouchStart={(e) => { setIsDragging(true); handleSliderMove(e.touches[0].clientX); }}
                    >
                        <div className="absolute inset-0 bg-slate-200">
                            <img src="https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="After" />
                            <div className="absolute bottom-4 right-4 bg-[#2ECC71] text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-lg">
                                12週後：體脂 13% 鋼鐵腹肌
                            </div>
                        </div>

                        <div className="absolute inset-y-0 left-0 right-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                            <div className="absolute inset-0 w-full h-full" style={{ width: `${100 / (sliderPos / 100)}%`}}>
                                <img src="https://images.unsplash.com/photo-1598151372479-02c89405c9db?q=80&w=1200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale brightness-90" alt="Before" />
                                <div className="absolute bottom-4 left-4 bg-[#E67E22] text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                                    Before：久坐肚腩 / 體脂 26% / 腰酸背痛
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 bottom-0 top-0 w-1 bg-[#E67E22] cursor-ew-resize flex items-center justify-center" style={{ left: `${sliderPos}%` }}>
                            <div className="w-10 h-10 bg-[#E67E22] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white pointer-events-none transform -translate-x-[4.5px] hover:scale-110 transition duration-150">
                                <MoveHorizontal size={16} />
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-center text-xs text-slate-500 mt-4 flex justify-center items-center gap-1"><Info size={14} className="text-[#2ECC71]"/> 左右拖拽橙色滑桿，實時對比身材前後改變。</p>
                </div>
            </section>

            {/* AI Coach */}
            <section id="aicoach" className="py-16 bg-[#FAFAFA] relative border-t border-slate-200">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#2ECC71]/5 rounded-full filter blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center space-y-4 mb-12">
                        <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] text-xs font-black tracking-widest uppercase rounded">INTELLIGENT AI</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#2C3E50]">AI Coaching 智能營養與目標計算器</h2>
                        <p className="text-sm text-slate-500 max-w-lg mx-auto">無須繁雜程序，輸入基本資料，AI 即時為忙碌地產經紀計算最精準的每日卡路里、蛋白質及專屬坐舖訓練！</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl relative">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">你的體重 (kg)</label>
                                <input type="number" value={aiWeight} onChange={e => setAiWeight(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#2C3E50] focus:outline-none focus:border-[#2ECC71] text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">你的身高 (cm)</label>
                                <input type="number" value={aiHeight} onChange={e => setAiHeight(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#2C3E50] focus:outline-none focus:border-[#2ECC71] text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">你的運動目標</label>
                                <select value={aiGoal} onChange={e => setAiGoal(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#2C3E50] focus:outline-none focus:border-[#2ECC71] text-sm">
                                    <option value="Fat Loss">減脂消肚腩 (Fat Loss)</option>
                                    <option value="Muscle Gain">增肌寬肩 (Muscle Gain)</option>
                                    <option value="Health/Stretch">維持體能與舒緩酸痛</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button onClick={generateAICoaching} className="w-full py-4 bg-[#2ECC71] hover:bg-emerald-600 text-white font-black rounded-xl transition shadow-lg flex items-center justify-center gap-2 glow-green">
                                <Sparkles size={18} />
                                <span>使用 AI 生成專屬訓練與飲食指南</span>
                            </button>
                        </div>

                        {aiResult.show && (
                            <div className="mt-8 p-6 bg-[#E8F5E9] rounded-2xl border border-[#2ECC71]/25 space-y-6 animate-in fade-in zoom-in duration-300">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-center">
                                        <span className="block text-xs text-slate-500 font-bold mb-1">每日 Kcal 消耗目標</span>
                                        <span className="text-2xl font-black text-[#E67E22]">{aiResult.kcal.toLocaleString()} kcal</span>
                                    </div>
                                    <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-center">
                                        <span className="block text-xs text-slate-500 font-bold mb-1">精準蛋白質攝取</span>
                                        <span className="text-2xl font-black text-[#2ECC71]">{aiResult.protein} g</span>
                                    </div>
                                    <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-center">
                                        <span className="block text-xs text-slate-500 font-bold mb-1">碎片運動頻率</span>
                                        <span className="text-2xl font-black text-[#2C3E50]">1-2 次 / 每日</span>
                                    </div>
                                </div>

                                <div className="border-t border-[#2ECC71]/20 pt-6 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] animate-ping"></span>
                                        <h4 className="text-sm font-bold text-[#2C3E50] flex items-center gap-1.5">
                                            <Bot size={16} className="text-[#2ECC71]" /> ResistFit AI 專屬定制計劃（經紀特設）
                                        </h4>
                                    </div>
                                    
                                    {aiResult.loading ? (
                                        <div className="flex flex-col items-center justify-center py-10 space-y-3">
                                            <div className="w-8 h-8 border-4 border-[#2ECC71] border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-xs text-slate-500 font-bold">Gemini AI 正在為您計算與編排地產舖特訓菜單...</p>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-[#2C3E50] leading-relaxed bg-white p-5 rounded-xl border border-slate-200 prose max-w-none whitespace-pre-wrap shadow-inner">
                                            {aiResult.text}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-16 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-16">
                        <span className="px-3 py-1 bg-[#E8F5E9] text-[#2ECC71] text-xs font-black tracking-widest uppercase rounded">TRANSPARENT PRICING</span>
                        <h2 className="text-3xl sm:text-5xl font-black text-[#2C3E50]">專屬經紀健身方案</h2>
                        <p className="text-sm text-slate-500 max-w-xl mx-auto">無隱藏收費，適合新手、中高階及想善用空檔的經紀精英。兩大計劃均支援 AI 指南！</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-[#FAFAFA] rounded-3xl border border-slate-200 p-8 flex flex-col justify-between space-y-8 relative hover:border-[#2ECC71]/50 transition duration-300 shadow-md">
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-extrabold text-[#2ECC71] tracking-wider uppercase">入門首選</span>
                                        <h3 className="text-2xl font-black text-[#2C3E50] mt-1">All-in-one 基礎方案</h3>
                                    </div>
                                    <span className="px-3 py-1 bg-slate-200 text-xs font-bold text-slate-600 rounded">限時優惠</span>
                                </div>

                                <p className="text-sm text-slate-600">專注於建立核心與單一肌群訓練（可自選專攻上半身 / 下半身），打好身體基礎。</p>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-black text-[#2C3E50]">HK$388</span>
                                    <span className="text-xs text-slate-500">/ 月</span>
                                </div>

                                <ul className="space-y-3 pt-4 border-t border-slate-200 text-sm text-slate-600">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-[#2ECC71]" />
                                        <span><strong>自選訓練：</strong>專攻上半身 或 下半身彈力帶教學</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-[#2ECC71]" />
                                        <span><strong>彈力帶 video fitness classes：</strong>40+ 堂精選影片</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-[#2ECC71]" />
                                        <span><strong>AI coaching guidelines：</strong>卡路里與飲食計劃指南</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-[#E67E22]">
                                        <CheckCircle2 size={16} className="text-[#E67E22]" />
                                        <span><strong>限時：1:1 真人 PT 監督 (每月限7次)</strong></span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-400 line-through decoration-slate-300">
                                        <XCircle size={16} className="text-slate-300" />
                                        <span>21天打卡實體彈力帶寄送 (需付郵費)</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => setModals(prev => ({...prev, checkout: true, selectedPlan: 'All-in-one 基礎方案'}))} className="w-full py-4 bg-[#2C3E50] hover:bg-slate-700 text-white font-extrabold rounded-2xl transition shadow-md">
                                立即訂閱基礎方案
                            </button>
                        </div>

                        <div className="bg-white rounded-3xl border-4 border-[#E67E22] p-8 flex flex-col justify-between space-y-8 relative shadow-2xl scale-100 lg:scale-105 transition glow-orange">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E67E22] text-white font-black text-xs px-4 py-1.5 rounded-full tracking-wider uppercase shadow-md whitespace-nowrap">
                                🏆 最多經紀強烈推薦
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-extrabold text-[#E67E22] tracking-wider uppercase">全方位突破</span>
                                        <h3 className="text-2xl font-black text-[#2C3E50] mt-1">Premium 專業無憂方案</h3>
                                    </div>
                                    <span className="px-3 py-1 bg-[#FDF2E9] text-[#E67E22] text-[11px] font-black rounded">強烈推介</span>
                                </div>

                                <p className="text-sm text-slate-600">全方位全身立體塑造訓練（胸背腿手核心），24小時無限次真人 PT 在線調整，完美善用碎片時間。</p>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-black text-[#2C3E50]">HK$688</span>
                                    <span className="text-xs text-slate-500">/ 月</span>
                                </div>

                                <ul className="space-y-3 pt-4 border-t border-slate-200 text-sm text-slate-600">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-[#2ECC71]" />
                                        <span><strong>全身訓練 (Full Body Training)：</strong>全系列無痛激活</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-[#2ECC71]" />
                                        <span><strong>1個月30次 (Unlimited)：</strong>1:1 真人 PT 專業教練監督</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-[#2ECC71]" />
                                        <span><strong>AI coaching guidelines：</strong>深度動態卡路里追蹤</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-[#2ECC71]" />
                                        <span><strong>全套高階彈力帶：</strong>免費速遞上門</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-[#E67E22] font-bold">
                                        <CheckCircle2 size={16} className="text-[#E67E22]" />
                                        <span>21天打卡直接獲贈進階版金屬扣彈力帶一整套</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => setModals(prev => ({...prev, checkout: true, selectedPlan: 'Premium 專業無憂方案'}))} className="w-full py-4 bg-[#E67E22] hover:bg-orange-600 text-white font-black rounded-2xl transition shadow-xl transform hover:-translate-y-0.5">
                                立即訂閱 Premium 方案
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* PT Remarks Section */}
            <section className="py-16 bg-[#FAFAFA] relative border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-12">
                        <span className="px-3 py-1 bg-slate-200 text-[#2C3E50] text-xs font-bold rounded">1:1 Seamless Handover</span>
                        <h2 className="text-3xl font-black text-[#2C3E50]">業界首創：真人 PT 接力監督系統</h2>
                        <p className="text-sm text-slate-500 max-w-lg mx-auto">每堂課教練都會詳細記錄你的細節進度，讓下一堂的跟進教練精準上手。</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-md">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-[#E67E22] animate-pulse"></span>
                                <h4 className="font-bold text-[#2C3E50] text-base">學員：Leo (地產經紀 / 30歲)</h4>
                            </div>
                            <span className="text-xs text-[#E67E22] bg-[#FDF2E9] px-2 py-1 rounded font-bold">訓練日誌 (手肘 & 下腰跟進)</span>
                        </div>

                        <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#2C3E50]/20">
                            <div className="flex items-start gap-4 relative">
                                <img src="https://placehold.co/100x100/2ecc71/ffffff?text=PT1" alt="PT A" className="w-12 h-12 rounded-full border-2 border-[#2ECC71] z-10 bg-white" />
                                <div className="bg-[#FDF2E9] p-4 rounded-xl border border-[#E67E22]/20 flex-1 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h5 className="text-xs font-bold text-[#2C3E50]">交班 PT: Gary (姿勢與物理治療專攻)</h5>
                                        <span className="text-[10px] text-slate-500 font-mono">2026-05-24 14:15</span>
                                    </div>
                                    <p className="text-sm text-slate-700">
                                        「Leo 剛做完兩堂『坐舖彈力劃船』。觀察到他長期睇樓企太久，下背（腰大肌）極度繃緊，右側臀中肌無力導致深蹲時膝蓋會內扣。已帶領他進行 5 分鐘彈力帶髖關節鬆動。」
                                    </p>
                                    <div className="text-[11px] text-[#E67E22] bg-white p-2.5 rounded-lg border border-[#E67E22]/20 font-bold">
                                        ⚠️ 接班提示：下次訓練請重點看緊他右臀激活。深蹲強度控制在 15kg 拉力內。
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 relative">
                                <img src="https://placehold.co/100x100/e67e22/ffffff?text=PT2" alt="PT B" className="w-12 h-12 rounded-full border-2 border-[#E67E22] z-10 bg-white" />
                                <div className="bg-[#FAFAFA] p-4 rounded-xl border border-slate-200 flex-1 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h5 className="text-xs font-bold text-[#2C3E50]">接班 PT: Victor (力量增肌專攻)</h5>
                                        <span className="text-[10px] text-slate-500 font-mono">2026-05-25 18:30</span>
                                    </div>
                                    <p className="text-sm text-slate-700">
                                        「收到 Gary 的備忘！今天在舖頭帶他做 15 分鐘『彈力帶側步走（蟹步）』，重點激活右臀。下腰酸痛感由原本 7 分降到 3 分，右膝內扣改善明顯。已記錄其強度並更新下個PT備忘。」
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rewards */}
            <section id="rewards" className="py-16 bg-white border-t border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-12">
                        <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] text-xs font-black tracking-widest uppercase rounded">GAMIFICATION REWARDS</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#2C3E50]">經紀專屬：動態激勵成就機制</h2>
                        <p className="text-sm text-slate-500 max-w-lg mx-auto">做地產講求開單激勵，健身同樣需要回報！我們為你準備了最豐厚的打卡福利：</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#FAFAFA] rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 relative overflow-hidden group premium-shadow">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ECC71]/5 rounded-full filter blur-2xl group-hover:bg-[#2ECC71]/10 transition"></div>
                            
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2ECC71] text-2xl">
                                    <CalendarCheck size={24} />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-[#2ECC71] uppercase">連續 21 日打卡挑戰</span>
                                    <h3 className="text-xl font-bold text-[#2C3E50]">送：進階版金屬扣抗阻彈力帶</h3>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600">
                                經紀工作生活繁忙，連續打卡 21 天，我們即刻免費速遞你一套價值 HK$299 嘅專業五階金屬扣彈力帶，幫你升級訓練！
                            </p>

                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner space-y-3">
                                <div className="flex justify-between text-xs font-bold text-slate-500">
                                    <span>你的打卡進度 (模擬)</span>
                                    <span className="text-[#2ECC71]"><strong>{streakDays.length + 8}</strong> / 21 天</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-[#2ECC71] h-full transition-all duration-500" style={{width: `${((streakDays.length + 8) / 21) * 100}%`}}></div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 pt-2">
                                    {[1, 2, 3, 4, 5, 6, 7].map(day => (
                                        <div 
                                            key={day} 
                                            onClick={() => toggleStreak(day)}
                                            className={`aspect-square rounded flex items-center justify-center text-xs font-bold cursor-pointer transition ${
                                                streakDays.includes(day) 
                                                ? 'bg-[#E8F5E9] border border-[#2ECC71] text-[#2ECC71] hover:bg-[#E8F5E9]/60' 
                                                : 'bg-slate-50 border border-slate-200 text-slate-400 hover:border-[#2ECC71] hover:text-[#2ECC71]'
                                            }`}
                                        >
                                            {streakDays.includes(day) ? <Check size={14} strokeWidth={3} /> : day}
                                        </div>
                                    ))}
                                </div>
                                <span className="block text-[10px] text-slate-400 text-center">點擊上方小方格，模擬今天完成碎片訓練打卡</span>
                            </div>
                        </div>

                        <div className="bg-[#FAFAFA] rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 relative overflow-hidden group premium-shadow">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E67E22]/5 rounded-full filter blur-2xl group-hover:bg-[#E67E22]/10 transition"></div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#FDF2E9] flex items-center justify-center text-[#E67E22] text-2xl">
                                    <Trophy size={24} />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-[#E67E22] uppercase">3個月（Quarterly）大挑戰</span>
                                    <h3 className="text-xl font-bold text-[#2C3E50]">續約 75 折起超值優惠</h3>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600">
                                每季只要達到我們所設定的體脂率 / 肌肉增加標準（由 1:1 PT 通過每月遙距評估確認），下個季度的續約即自動獲取「尊爵經紀 75 折續約優惠價」，最少省去上千元！
                            </p>

                            <div className="bg-[#FDF2E9] p-5 rounded-xl border border-[#E67E22]/10 flex justify-between items-center shadow-inner">
                                <div>
                                    <h5 className="text-xs font-bold text-slate-500">原價季度續約：</h5>
                                    <span className="text-lg font-bold text-slate-400 line-through">HK$2,064</span>
                                </div>
                                <div className="text-right">
                                    <h5 className="text-xs font-bold text-[#E67E22]">季度挑戰成功價：</h5>
                                    <span className="text-2xl font-black text-[#E67E22]">HK$1,548</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modals */}
            {modals.checkout && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C3E50]/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full relative space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setModals(prev => ({...prev, checkout: false}))} className="absolute top-4 right-4 text-slate-400 hover:text-[#2C3E50] transition">
                            <X size={20} />
                        </button>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2ECC71] flex items-center justify-center mx-auto mb-2">
                                <ShoppingCart size={20} />
                            </div>
                            <h3 className="text-xl font-black text-[#2C3E50]">啟動 ResistFit 訓練方案</h3>
                            <p className="text-xs text-slate-500">您選擇了：<span className="text-[#E67E22] font-bold">{modals.selectedPlan}</span></p>
                        </div>
                        
                        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">您的姓名</label>
                                <input required value={checkoutForm.name} onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})} type="text" placeholder="例：陳大文" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#2C3E50] text-sm focus:outline-none focus:border-[#2ECC71]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">手機號碼 (WhatsApp跟進用)</label>
                                <input required value={checkoutForm.phone} onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})} type="tel" placeholder="例：9123 4567" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#2C3E50] text-sm focus:outline-none focus:border-[#2ECC71]" />
                            </div>
                            <div className="text-xs text-slate-600 bg-[#E8F5E9] p-4 rounded-lg border border-[#2ECC71]/10 leading-relaxed">
                                訂閱後，我們的 1:1 真人 PT 將於 1 小時內通過 WhatsApp 聯絡您，並在 24 小時內寄出首套彈力帶與開通 AI Guidelines 權限。
                            </div>
                            <button type="submit" className="w-full py-4 bg-[#E67E22] hover:bg-orange-600 text-white font-black rounded-xl transition shadow-lg">
                                確認並立即加入
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {modals.alert && (
                <div className="fixed inset-0 z-[100] bg-[#2C3E50]/60 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative glow-green animate-in fade-in zoom-in duration-200">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${modals.alertSuccess ? 'bg-[#E8F5E9] text-[#2ECC71]' : 'bg-[#FDF2E9] text-[#E67E22]'}`}>
                            {modals.alertSuccess ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-[#2C3E50] font-sans">{modals.alertTitle}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{modals.alertMessage}</p>
                        </div>
                        <button onClick={() => setModals(prev => ({...prev, alert: false}))} className="w-full py-3 bg-[#2ECC71] hover:bg-emerald-600 text-white font-black rounded-xl transition shadow-md">
                            我知道了
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-[#2C3E50] text-white border-t border-slate-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#2ECC71] rounded-lg flex items-center justify-center">
                                <Dumbbell className="text-[#2C3E50]" size={16} strokeWidth={3} />
                            </div>
                            <span className="text-lg font-black tracking-tight text-white">Resist<span className="text-[#2ECC71]">Fit</span></span>
                        </div>
                        <p className="text-xs text-white/60">© 2026 ResistFit. All rights reserved. 專為地產經紀 / 久坐人士專屬打造的彈力訓練平台。</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}