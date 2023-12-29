import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropPic";
import axios from "axios";
import { useDispatch } from "react-redux";
import { set } from "idb-keyval";
import { store } from "../../../../Misc/cacheStorage";
import { domain } from "../../../../Misc/helper";

// Component
const Profile_Picture = (props) => {
    const Dispatch = useDispatch();
    const { image, email, tokenID, removeImage } = props;
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [width, setWidth] = useState(0);
    const [cropPixel, setCropPixel] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCropPixel(croppedAreaPixels);
    };

    const style = {
        cropAreaStyle: {
            border: "1px solid #000000",
        },
        mediaStyle: {
            border: "1px solid #000000",
        },
    };

    const cropImage = async () => {
        const base64 = await getCroppedImg(image, cropPixel);

        try {
            const response = await axios({
                method: "POST",
                url: domain + "account/picture",
                data: {
                    email: email,
                    tokenID: tokenID,
                    base64: base64,
                },
            });

            const result = response.data;

            // Update Personal
            await set("personal", result, store);

            // Update Store
            Dispatch({ type: "profile", payload: result });

            // Remove Image
            removeImage(null);
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 w-100" style={{ backgroundColor: "#ffffff" }}>
            <div className="w-75 position-relative" style={{ height: "50%" }}>
                <Cropper image={image} crop={crop} zoom={zoom} aspect={4 / 4} onCropChange={setCrop} onCropComplete={onCropComplete} showGrid={false} onZoomChange={setZoom} style={style} />
            </div>
            <div className="d-flex w-75 justify-content-between mt-2">
                <button
                    className="btn btn-sm btn-white p-0"
                    style={{ fontSize: "30px" }}
                    onClick={() => {
                        if (width > 0) {
                            setZoom(zoom - 0.1);
                            setWidth(width - 10);
                        }
                    }}
                >
                    -
                </button>
                <div className="progress" style={{ width: "93%", marginTop: "1.3rem" }}>
                    <div className="progress-bar bg-secondary" role="progressbar" style={{ width: `${width}%` }} aria-valuenow={width} aria-valuemin="0" aria-valuemax="100">
                        {width}%
                    </div>
                </div>
                <button
                    className="btn btn-sm btn-white p-0"
                    style={{ fontSize: "25px" }}
                    onClick={() => {
                        if (width < 100) {
                            setZoom(zoom + 0.1);
                            setWidth(width + 10);
                        }
                    }}
                >
                    +
                </button>
            </div>
            <div className="w-75 my-3 d-flex justify-content-between">
                <button className="btn btn-sm btn-danger px-3" onClick={() => removeImage(null)}>
                    Cancel
                </button>
                <button className="btn btn-sm btn-secondary px-3" onClick={() => cropImage()}>
                    Crop Image
                </button>
            </div>
        </div>
    );
};

// Export
export default Profile_Picture;
