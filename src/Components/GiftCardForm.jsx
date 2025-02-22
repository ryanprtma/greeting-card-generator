import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function GiftCardForm() {
    const [formData, setFormData] = useState({ dear: "", message: "", from: "" });
    const [preview, setPreview] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (preview) drawCanvas();
    }, [preview, formData]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        },
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "message" && value.length > 54) {
            alert("Maximum message!")
            return;
        }

        setFormData((previousData) => {
            let updatedData = { dear: previousData.dear, message: previousData.message, from: previousData.from };
            updatedData[name] = value;
            return updatedData;
        });
    };

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = preview;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            ctx.font = "30px cursive";
            ctx.fillStyle = "black";

            ctx.fillText(formData.dear, 300, 210);
            ctx.fillText(formData.message.slice(0, 27), 200, 270);
            if (formData.message.length > 26) {
                ctx.fillText(formData.message.slice(28), 200, 330);
            }

            ctx.fillText(formData.from, 260, 380); //
        };
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "gift-card.png";
        link.click();
    };

    return (
        <div style={{ maxWidth: "33.33%", margin: "0 auto", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "left", paddingBottom: "8px" }}>Gift Card</h2>

            <hr style={{ margin: "24px 0", border: "0", borderTop: "1px solid #f3f3fd", width: "100%" }} />

            {/* Image Preview */}
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: preview ? "block" : "none"
                }}
            />

            {/* File Upload */}
            <label htmlFor="file-upload" style={{ fontWeight: "bold", display: "block", marginBottom: "8px", textAlign: "left" }}>File Upload</label>
            <div {...getRootProps()} style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center", marginBottom: "24px", cursor: "pointer" }}>
                <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    {...getInputProps()}
                />
                <p>Drag and drop files here or click to browse</p>
            </div>

            {/* Input Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px", flexGrow: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", width: "100%" }}>
                    <label htmlFor="dear" style={{ fontWeight: "bold" }}>Dear</label>
                    <input
                        id="dear"
                        type="text"
                        name="dear"
                        value={formData.dear}
                        onChange={handleChange}
                        style={{ width: "50%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", width: "100%" }}>
                    <label htmlFor="message" style={{ fontWeight: "bold" }}>Message</label>
                    <input
                        id="message"
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        style={{ width: "50%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", width: "100%" }}>
                    <label htmlFor="from" style={{ fontWeight: "bold" }}>From</label>
                    <input
                        id="from"
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        style={{ width: "50%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                </div>
            </div>

            <hr style={{ margin: "24px 0", border: "0", borderTop: "1px solid #f3f3fd", width: "100%" }} />

            {/* Download Button */}
            <button onClick={handleDownload} style={{ width: "auto", padding: "10px 20px", background: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", display: "block", marginLeft: "auto", marginRight: "auto" }}>Download</button>
        </div>
    );
}
