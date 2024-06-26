import { useState, useEffect } from "react";
import remarkGfm from 'remark-gfm'
import Markdown from "react-markdown";
import LoadingPage from "./LoadingPage";

export default function MainPage(props: { markdownUrl: string}) {
    const [markdown, setMarkdown] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetchFromAPI() {
            let response = await fetch(props.markdownUrl)
            let blob = await response.blob()
            let text = await blob.text()
            setMarkdown(text)
        }
        fetchFromAPI()
    }, []);

    return markdown === undefined ?
        <LoadingPage />
        :
        (
            <div className="px-6 py-32 lg:px-8">
                <div className="mx-auto max-w-3xl text-base leading-7 prose prose-zinc dark:prose-invert dark:prose-inline-code:bg-black prose-inline-code:bg-zinc-200 prose-inline-code:px-1.5 prose-inline-code:py-1 prose-inline-code:rounded-md prose-inline-code:before:content-none prose-inline-code:after:content-none">
                    <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
                </div>
            </div>
        )
}
