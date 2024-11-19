"use client";

import {LinkIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";


export default function CodeReviewQuiz({params}: Readonly<{ params: { randomName: string } }>) {
    const randomName = params.randomName;
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-[#1C1C1E] p-4">
                <Card className="w-full max-w-md bg-[#1C1C1E] border-[#2A2A2E] shadow-2xl">
                    <CardHeader>
                        <CardTitle
                            className="text-3xl font-bold text-center text-[#39b3c2] flex items-center justify-center">
                            <LinkIcon className="w-8 h-8 mr-2"/>
                            Gracias por participar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-lg font-bold text-center items-center justify-center">
                            <p className="text-white">Tu nombre de usuario es</p>
                            <p className="text-[#39b3c2]">{randomName}</p>
                        </CardDescription>
                    </CardContent>
                </Card>
        </main>
    )
}