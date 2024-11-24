import {Card, CardContent} from "@/components/ui/card";
import {Code2} from "lucide-react";
import {RealTimeForm} from "@/components/forms/RealTimeForm";

export default function CodeReviewQuiz() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-[#1C1C1E] p-4">
            <Card className="w-full max-w-md bg-[#1C1C1E] border-[#2A2A2E] shadow-2xl">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center mb-6">
                        <div
                            className="w-20 h-20 bg-gradient-to-br from-gray-700 to-[#39b3c2] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Code2 className="w-10 h-10 text-white"/>
                        </div>
                        <h1 className="text-3xl font-bold text-center text-[#39b3c2]">
                            Sala de Espera
                        </h1>
                    </div>
                    <RealTimeForm />
                </CardContent>
            </Card>
        </main>
    )
}