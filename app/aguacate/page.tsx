import {Button} from "@/components/ui/button";
import {Shuffle} from "lucide-react";
import {SendRealTimeMessage} from "@/src/backend/aguacate";

export default function CodeReviewQuiz() {
    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <form action={SendRealTimeMessage} className="space-y-4">
                <input id="message" name="message" className="px-4 rounded-lg" placeholder={"a pon tu mensaje aqui"}/>
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-700 to-[#39b3c2] hover:from-gray-600 hover:to-[#2a8a96] text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                    <Shuffle className="mr-2 h-5 w-5"/> Send message
                </Button>
            </form>
        </main>
    )
}