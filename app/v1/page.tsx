import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {  Code2, Shuffle } from "lucide-react"
import {OpenAnonymousRandomRepositoryServerAction} from "@/src/backend/server";

export default function CodeReviewQuiz() {
    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <Card
                className="w-full max-w-md bg-gradient-to-br from-gray-800 to-black text-white border-none shadow-2xl">
                <CardContent className="p-6">
                    <div className="text-center mb-6">
                        <div
                            className="w-20 h-20 bg-gradient-to-br from-gray-700 to-[#39b3c2] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Code2 className="w-10 h-10 text-white"/>
                        </div>
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-[#39b3c2] mb-2">
                            Code Review Roulette
                        </h2>
                        <p className="text-gray-300">¡Deja que el azar elija tu próxima revisión de código!</p>
                    </div>
                    <form action={OpenAnonymousRandomRepositoryServerAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="urls" className="text-lg font-semibold text-gray-300">
                                URLs de Repositorios
                            </Label>
                            <Textarea
                                id="urls"
                                name="urls"
                                placeholder="https://github.com/usuario/repo1&#10;https://github.com/usuario/repo2&#10;https://github.com/usuario/repo3"
                                className="h-32 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-gray-700 to-[#39b3c2] hover:from-gray-600 hover:to-[#2a8a96] text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            <Shuffle className="mr-2 h-5 w-5"/> ¡Girar la Ruleta!
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}