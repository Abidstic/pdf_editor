'use client';
import { Button } from '@/components/ui/button';
import { UploadCloudIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        // Check if the selected file is a PDF
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please select a PDF file.');
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        // Perform upload logic here (e.g., send the file to the server)

        // After successful upload, show the PDF
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            // Open the PDF in a new tab
            window.open(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);
    };
    return (
        <div className="container mx-auto flex flex-col justify-between max-h-fit max-w-screen-lg ">
            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto ">
                <Input
                    id="pdf"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
            </div>
            <div className=" py-5 flex justify-center">
                <Button
                    className="flex h-20 w-80 font-bold text-xl"
                    variant="secondary"
                    onClick={handleUpload}
                >
                    <UploadCloudIcon className="mr-2 h-8 w-8 " />
                    Upload Your PDF
                </Button>
            </div>
        </div>
    );
}
