import { Fragment, useState } from "react";
import Cropper from "react-easy-crop";
import "react-image-crop/dist/ReactCrop.css";
import { domain } from "../../helpers";

const Form2 = (props) => {
    const { data, setData } = props;
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropPixel, setCropPixel] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCropPixel(croppedAreaPixels);
    };

    const style = {
        cropAreaStyle: {
            border: "1px solid #000000",
        },
    };

    const selectImage = (file) => {
        setSrc(URL.createObjectURL(file));
    };

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });

    const cropImageNow = async () => {
        const image = await createImage(src);
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = cropPixel.width;
        canvas.height = cropPixel.height;
        const ctx = canvas.getContext("2d");

        const pixelRatio = window.devicePixelRatio;
        canvas.width = cropPixel.width * pixelRatio;
        canvas.height = cropPixel.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(image, cropPixel.x * scaleX, cropPixel.y * scaleY, cropPixel.width * scaleX, cropPixel.height * scaleY, 0, 0, cropPixel.width, cropPixel.height);

        // Converting to base64
        const base64Image = canvas.toDataURL("image/jpeg");

        if (data["images"]["index"] === "img1") {
            if (data["item"] < 0) {
                setData({ ...data, ...(data["images"]["main"] = base64Image) });
            } else {
                setData({ ...data, ...(data["newImages"]["main"] = base64Image) });
            }
        }

        if (data["images"]["index"] === "img2") {
            if (data["item"] < 0) {
                setData({ ...data, ...(data["images"]["image_1"] = base64Image) });
            } else {
                setData({ ...data, ...(data["newImages"]["image_1"] = base64Image) });
            }
        }

        if (data["images"]["index"] === "img3") {
            if (data["item"] < 0) {
                setData({ ...data, ...(data["images"]["image_2"] = base64Image) });
            } else {
                setData({ ...data, ...(data["newImages"]["image_2"] = base64Image) });
            }
        }
    };

    const clickFileInput = (id) => {
        setData({ ...data, ...(data["images"]["index"] = id) });
        document.querySelector("input#" + id).click();
    };

    return (
        <Fragment>
            <form action="" method="post">
                <input type="file" name="img1" id="img1" accept="image/*" onChange={(e) => selectImage(e.target.files[0])} />
                <input type="file" name="img2" id="img2" accept="image/*" onChange={(e) => selectImage(e.target.files[0])} />
                <input type="file" name="img3" id="img3" accept="image/*" onChange={(e) => selectImage(e.target.files[0])} />
            </form>
            <div className="cont1 d-flex justify-content-between">
                <div className="cont2">
                    <div>{src && <Cropper image={src} crop={crop} zoom={zoom} aspect={4 / 5} objectFit="auto-cover" onCropChange={setCrop} onCropComplete={onCropComplete} showGrid={false} onZoomChange={setZoom} style={style} />}</div>
                    <div>
                        <button type="button" className="btn w-100 btn-secondary" onClick={cropImageNow}>
                            Crop Image
                        </button>
                    </div>
                </div>
                <div className="cont3">
                    <div>
                        {data.images.main && <img src={data.images.main.indexOf(".jpg") > -1 ? (data.newImages.main !== "" ? data.newImages.main : domain + "image/" + data.images.main) : data.images.main} alt="main" />}
                        <button type="button" className="btn" onClick={(e) => clickFileInput("img1")}>
                            Main
                        </button>
                    </div>
                    <div>
                        {data.images.image_1 && <img src={data.images.image_1.indexOf(".jpg") > -1 ? (data.newImages.image_1 !== "" ? data.newImages.image_1 : domain + "image/" + data.images.image_1) : data.images.image_1} alt="image_1" />}
                        <button type="button" className="btn" onClick={(e) => clickFileInput("img2")}>
                            Image 1
                        </button>
                    </div>
                    <div>
                        {data.images.image_2 && <img src={data.images.image_2.indexOf(".jpg") > -1 ? (data.newImages.image_2 !== "" ? data.newImages.image_2 : domain + "image/" + data.images.image_2) : data.images.image_2} alt="image_2" />}
                        <button type="button" className="btn" onClick={(e) => clickFileInput("img3")}>
                            Image 2
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Form2;
