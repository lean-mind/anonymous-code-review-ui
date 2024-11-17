import {Button} from "@/components/ui/button";
import {LinkIcon, Shuffle} from "lucide-react";
import {sendRealTimeMessage} from "@/src/backend/realTimeManager";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function CodeReviewQuiz() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-[#1C1C1E] p-4">
                <Card className="w-full max-w-md bg-[#1C1C1E] border-[#2A2A2E] shadow-2xl">
                    <CardHeader>
                        <CardTitle
                            className="text-3xl font-bold text-center text-[#39b3c2] flex items-center justify-center">
                            <LinkIcon className="w-8 h-8 mr-2"/>
                            Añadir Enlace
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={sendRealTimeMessage} className="space-y-4">
                            <div>
                                <Label htmlFor="link" className="text-[#39b3c2]">Enlace</Label>
                                <Input
                                    id="repository"
                                    name="repository"
                                    className="bg-[#2A2A2E] text-white border-[#39b3c2] focus:ring-[#39b3c2]"
                                    placeholder="Introduce la Url de tu Repositorio"
                                    type="url"
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