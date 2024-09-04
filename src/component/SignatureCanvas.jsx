// src/components/EnhancedSignatureCanvas.js
import React, { useRef, useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const SignatureCanvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [lineWidth, setLineWidth] = useState(2);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = 150; // Fixed height for signature area
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setContext(ctx);
    }, [lineWidth, strokeColor, backgroundColor]);



    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        context.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const clearCanvas = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.fillStyle = '#ffffff';
        context.strokeStyle = '#000000';
        context.lineWidth = '2'
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        setStrokeColor('#000000');
        setBackgroundColor('#ffffff');
        setLineWidth(2);
    };


    const handleChange = () => {

    }

    const downloadImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'signature.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="flex justify-center mt-6 mb-2">
                    <a
                        href='https://reactviteportfolio.netlify.app/'
                        className="portfolio-btn bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-700">
                        Checkout my Portfolio
                    </a>
                </div>
            <div className="bg-white rounded-lg shadow-lg p-5 w-96">
                <h2 className="text-lg font-semibold mb-4">Create Signature</h2>
                <ul className="flex border-b mb-5">
                    <li className="mr-6">
                        <button className="text-red-600 border-b-2 border-red-600 py-2 px-4">Draw</button>
                    </li>
                </ul>
             
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    onMouseLeave={finishDrawing}
                    className="border border-gray-300 rounded w-full h-40 cursor-crosshair mb-4"
                />
                <div className="flex justify-between mb-5">
                    <div className="relative group">
                        <input id="bgColor" type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-8 h-8 cursor-pointer appearance-none border-none" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded py-1 px-2">
                            Background Color
                        </div>
                    </div>

                    <div className="relative group">
                        <input id="strokeColor" type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="w-8 h-8 cursor-pointer appearance-none border-none outline-none" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded py-1 px-2">
                            Signature Color
                        </div>
                    </div>
                    <input id="penSize" type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} className="w-full transition-all duration-200 ease-in-out mt-1 cursor-pointer" />
                </div>

                <div className="text-sm text-gray-600 mb-5">
                    By signing this document with an electronic signature, I agree that such signature will be as valid as handwritten signatures to the extent allowed by local law.
                </div>
                <div className="flex justify-end">
                    <button onClick={clearCanvas} className="text-gray-500 mr-4">Reset</button>
                    <button onClick={downloadImage} className="bg-red-600 text-white py-2 px-4 rounded" >Download</button>
                </div>
            </div>
        </div>
    );
};

export default SignatureCanvas;
