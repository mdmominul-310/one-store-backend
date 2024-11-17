import { Schema, model } from "mongoose";
import { IYoutubePromo, YoutubePromoModel } from "./youtube-promo.interface";
import numberOperation from "../../../util/numOperation";

const youtubePromoSchma = new Schema<IYoutubePromo, YoutubePromoModel>({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: false
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true });
youtubePromoSchma.pre("save", function (next) {
    this.id = 'WA' + numberOperation.randomSixDigitNumber().toString();
    next();
});

const YoutubePromo = model<IYoutubePromo, YoutubePromoModel>("YoutubePromo", youtubePromoSchma);



export default YoutubePromo;