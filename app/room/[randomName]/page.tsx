"use client";

import {AwardIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

type Props = Readonly<{ params: { randomName: string } }>;

export default function CodeReviewQuiz({params}: Props) {
    const randomName = params.randomName;
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-[#1C1C1E] p-4">
                <Card className="w-full max-w-md bg-[#1C1C1E] border-[#2A2A2E] shadow-2xl">
                    <CardHeader>
                        <CardTitle
                            className="text-3xl font-bold text-center text-[#39b3c2] flex flex-col items-center justify-center">
                            <AwardIcon className="w-14 h-14 mb-2"/>
                            Gracias por participar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-lg font-bold text-center items-center flex flex-col justify-center">
                            <span className="text-white">Tu nombre de usuario es</span>
                            <span className="text-[#39b3c2]">{randomName}</span>
                        </CardDescription>
                    </CardContent>
                </Card>
        </main>
    )
}