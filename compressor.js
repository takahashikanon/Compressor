
class Compressor {

    constructor() {
        this.canvasDiv = null;
    }

    async compressor(base64, compression) {
        this.makeCanvas();
        let result = await this.drowCanvas(base64, compression);
        this.removeCanvas();

        return result;
    }

    async #drowCanvas(base64, compression) {
        return new Promise((resolve, reject) => {

            this.canvasDiv = document.getElementById('board');
            let canvas2d = this.canvasDiv.getContext('2d')

            let Img = new Image();

            Img.src = base64;
            Img.onload = e => {

                let reSizeImg = this.reSize(Img.naturalWidth, Img.naturalHeight, compression);
                canvas2d.drawImage(Img, 0, 0, reSizeImg.width, reSizeImg.height);
                let resizebase64 = this.readCanvas();

                resolve(resizebase64)
            };
        })
    }

    #reSize(width, height, compression = 1) {
        if (compression > 1) {
            return;
        }

        let reWidth = width * compression;
        let reHeight = height * compression;
        let reData = { width: reWidth, height: reHeight };

        // キャンバスのサイズ変更
        this.canvasDiv.width = reWidth;
        this.canvasDiv.height = reHeight;

        return reData;
    }

    #readCanvas() {
        let base64 = this.canvasDiv.toDataURL('image/jpeg');
        return base64;
    }

    #makeCanvas() {
        let body = document.getElementsByTagName('body');
        let canvasDiv = document.createElement('canvas');
        canvasDiv.width = 10;
        canvasDiv.height = 10;
        canvasDiv.setAttribute('id', 'board');
        body[0].appendChild(canvasDiv);
    }

    #removeCanvas() {
        this.canvasDiv.remove();
    }
}