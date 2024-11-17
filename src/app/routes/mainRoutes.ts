import { Router } from "express";
import { userRoutes } from "../modules/users/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { AddressRooutes } from "../modules/address/address.routes";
import { UploadsRoutes } from "../modules/uploads/uploads.routes";
import { categoriesRoutes } from "../modules/catalog/categories/categories.routes";
import { colorsRoutes } from "../modules/catalog/colors/colors.routes";
import { sizesRoutes } from "../modules/catalog/sizes/size.routes";
import { productRoutes } from "../modules/products/products.routes";
import { bannerRoutes } from "../modules/banner/banner.routes";
import { orderRoutes } from "../modules/orders/orders.routes";
import { menuRoutes } from "../modules/menus/menus.routes";
import { promotionRoutes } from "../modules/promotion/promotion";
import { youtubePromoRoutes } from "../modules/youtube-promo/youtube-promo.routes";
import { systemConfigRouter } from "../modules/system-config/system.config";
import { flashSaleRoutes } from "../modules/flash-sale/flash-sale.routes";

const router = Router();
const moduleRoutes = [
    {
        path: '/',
        route: authRoutes
    },
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/address',
        route: AddressRooutes
    },
    {
        path: '/uploads',
        route: UploadsRoutes,
    },
    {
        path: '/categories',
        route: categoriesRoutes
    },
    {
        path: '/colors',
        route: colorsRoutes
    },
    {
        path: '/sizes',
        route: sizesRoutes
    },
    {
        path: '/products',
        route: productRoutes
    },
    {
        path: '/banner',
        route: bannerRoutes

    },
    {
        path: '/orders',
        route: orderRoutes
    },
    {
        path: '/menus',
        route: menuRoutes
    },
    {
        path: '/promotions',
        route: promotionRoutes

    },
    {
        path: '/youtube-promo',
        route: youtubePromoRoutes
    },
    {
        path: '/config',
        route: systemConfigRouter
    },
    {
        path: '/flash-sale',
        route: flashSaleRoutes
    }

];

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
}
);

export default router;