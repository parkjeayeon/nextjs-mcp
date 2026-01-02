"use client";

import {useEffect, useState} from "react";
import {Badge} from "@openai/apps-sdk-ui/components/Badge";
import {useWidgetProps, useMaxHeight, useDisplayMode} from "@/app/hooks";
import {t, localeMap, WidgetLocale} from "@/lib/widget-translations";

type TimeData = {
    timezone?: string;
    formattedTime?: string;
    isoTime?: string;
    timestamp?: number;
    language?: string;
};

type WidgetProps = {
    result?: {
        structuredContent?: TimeData;
    };
} & TimeData;

export default function TimeWidget() {
    const props = useWidgetProps<WidgetProps>();
    const maxHeight = useMaxHeight() ?? undefined;
    const displayMode = useDisplayMode();
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    const data = props?.result?.structuredContent || props;
    const timezone = data?.timezone || "Asia/Seoul";
    const formattedTime = data?.formattedTime;
    const isoTime = data?.isoTime;
    const language = (data?.language || "ko") as WidgetLocale;
    
    const locale = localeMap[language];

    // 실시간 시계 업데이트
    useEffect(() => {
        setCurrentTime(new Date());
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date: Date) => {
        try {
            return new Intl.DateTimeFormat(locale, {
                timeZone: timezone,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).format(date);
        } catch {
            return "--:--:--";
        }
    };

    const formatDate = (date: Date) => {
        try {
            return new Intl.DateTimeFormat(locale, {
                timeZone: timezone,
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
            }).format(date);
        } catch {
            return "";
        }
    };

    const timezoneEmoji: Record<string, string> = {
        "Asia/Seoul": "🇰🇷",
        "Asia/Tokyo": "🇯🇵",
        "America/New_York": "🇺🇸",
        "America/Los_Angeles": "🇺🇸",
        "Europe/London": "🇬🇧",
        "Europe/Paris": "🇫🇷",
        UTC: "🌍",
    };

    return (

        <div
            className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center p-6"
            style={{
                maxHeight,
                height: displayMode === "fullscreen" ? maxHeight : undefined,
            }}
        >
            <div className="w-full max-w-md">
                {/* 메인 카드 */}
                <div className="relative">
                    {/* 글로우 효과 */}
                    <div
                        className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-50 animate-pulse"/>

                    {/* 카드 본체 */}
                    <div
                        className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10">
                        {/* 헤더 */}
                        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-4xl">🕐</span>
                                <span className="text-white font-bold text-xl">{t(language, "time.currentTime")}</span>
                            </div>
                        </div>

                        {/* 시계 디스플레이 */}
                        <div className="p-8">
                            {/* 디지털 시계 */}
                            <div className="bg-slate-800/80 rounded-2xl p-6 mb-6">
                                <div className="text-center">
                                    <div className="text-6xl font-mono font-bold text-white tracking-wider mb-2">
                                        {currentTime ? formatTime(currentTime) : "--:--:--"}
                                    </div>
                                    <div className="text-slate-400 text-lg">
                                        {currentTime ? formatDate(currentTime) : ""}
                                    </div>
                                </div>
                            </div>

                            {/* 원래 도구 응답 시간 */}
                            {formattedTime && (
                                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 mb-6">
                                    <p className="text-indigo-300 text-sm text-center">
                                        📨 {t(language, "time.toolCallTime")}:{" "}
                                        <span className="font-medium">{formattedTime}</span>
                                    </p>
                                </div>
                            )}

                            {/* 타임존 뱃지 */}
                            <div className="flex justify-center gap-3 flex-wrap">
                                <Badge className="px-4 py-2">
                    <span className="mr-2">
                      {timezoneEmoji[timezone] || "🌍"}
                    </span>
                                    {timezone}
                                </Badge>

                                {isoTime && (
                                    <Badge className="px-4 py-2 font-mono">
                                        {isoTime.split("T")[1]?.split(".")[0] || ""}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 푸터 */}
                <p className="text-center text-slate-500 text-sm mt-6">
                    {t(language, "mcpTool")}:{" "}
                    <code className="bg-slate-800/50 px-2 py-1 rounded">get_time</code>
                </p>
            </div>
        </div>
    );
}

