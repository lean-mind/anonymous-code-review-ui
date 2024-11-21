"use client";

import {Button} from "@/components/ui/button";
import {LinkIcon, Shuffle} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {sendRealTimeMessage} from "@/lib/backend/realTimeManager";

export default function CodeReviewQuiz() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-[#1C1C1E] p-4">
                <Card className="w-full max-w-md bg-[#1C1C1E] border-[#2A2A2E] shadow-2xl">
                    <CardHeader>
                        <CardTitle
                            className="text-3xl font-bold text-center text-[#39b3c2] flex flex-col items-center justify-center">
                            <LinkIcon className="w-[40px] h-[40px] mb-2"/>
                            Añadir Enlace
                        </CardTitle>
                        <p className="text-sm text-center text-[#39b3c2] opacity-85">Solo se permiten repositorios públicos de Github</p>
                    </CardHeader>
                    <CardContent>
                        <form action={sendRealTimeMessage} className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="link" className="text-lg text-[#39b3c2]">Enlace</Label>
                                <Input
                                    id="repository"
                                    name="repository"
                                    className="bg-[#2A2A2E] text-white border-[#39b3c2] focus:ring-[#39b3c2]"
                                    placeholder="Introduce la Url de tu Repositorio"
                                    type="url"
                                    pattern="https:\/\/github\.com\/.+\/.+"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-[#39b3c2] hover:bg-[#2d8f9a] text-white">
                                Añadir Enlace <Shuffle className="w-5 h-5 ml-2"/>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
        </main>
    )
}