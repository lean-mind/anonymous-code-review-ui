import {Repository} from "@/lib/domain/types";
import {FC} from "react";
import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";
import {Loader2, Shuffle} from "lucide-react";

type Props = {
    repositories: Repository[];
}

export const RepositorySubmitButton: FC<Props> = ({ repositories}) => {
    const { pending } = useFormStatus();
    return (
        <Button
            className="w-full bg-gradient-to-r from-gray-700 to-[#39b3c2] hover:from-gray-600 hover:to-[#2a8a96] text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            type="submit"
            disabled={pending}
        >
            {pending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
                <Shuffle className="mr-2 h-5 w-5" />
            )}
            {repositories.length === 0 ? '¡Comenzando!' : 'Iniciar Code Review'}
        </Button>
    );
};