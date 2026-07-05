import styles from "./Skeleton.module.css";

// Skeleton para una tarjeta de producto en el grid
export function ProductCardSkeleton() {
    return (
        <div className={styles.productCardSkeleton}>
            <div className={`${styles.skeleton} ${styles.imageSkeleton}`}></div>
            <div className={styles.infoSkeleton}>
                <div className={`${styles.skeleton} ${styles.titleSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.priceSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.stockSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.buttonSkeleton}`}></div>
            </div>
        </div>
    );
}

// Grid de skeletons para la página de productos (8 tarjetas)
export function ProductGridSkeleton({ count = 8 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </>
    );
}

// Skeleton para la página de detalle de producto
export function ProductDetailSkeleton() {
    return (
        <div className={styles.productDetailSkeleton}>
            <div className={`${styles.skeleton} ${styles.detailImageSkeleton}`}></div>
            <div className={styles.detailContentSkeleton}>
                <div className={`${styles.skeleton} ${styles.detailTitleSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.detailPriceSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.detailInfoSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.detailInfoSkeleton}`} style={{ width: '40%' }}></div>
                <div className={`${styles.skeleton} ${styles.detailInfoSkeleton}`} style={{ width: '45%' }}></div>
                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className={`${styles.skeleton} ${styles.detailBtnSkeleton}`}></div>
                    <div className={`${styles.skeleton} ${styles.detailBtnSkeleton}`}></div>
                </div>
            </div>
        </div>
    );
}

// Skeleton para un item del carrito
export function CartItemSkeleton() {
    return (
        <div className={styles.cartItemSkeleton}>
            <div className={`${styles.skeleton} ${styles.cartImageSkeleton}`}></div>
            <div className={styles.cartInfoSkeleton}>
                <div className={`${styles.skeleton} ${styles.cartTitleSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.cartPriceSkeleton}`}></div>
            </div>
            <div className={`${styles.skeleton} ${styles.cartBtnSkeleton}`}></div>
        </div>
    );
}

// Skeleton para la lista del carrito (3 items)
export function CartListSkeleton({ count = 3 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <CartItemSkeleton key={i} />
            ))}
        </>
    );
}

// Skeleton para una tarjeta de pedido en el historial
export function OrderSkeleton() {
    return (
        <div className={styles.orderSkeleton}>
            <div className={styles.orderHeaderSkeleton}>
                <div className={`${styles.skeleton} ${styles.orderIdSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.orderDateSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.orderBadgeSkeleton}`}></div>
            </div>
            <div className={styles.orderBodySkeleton}>
                <div>
                    <div className={`${styles.skeleton} ${styles.orderInfoLineSkeleton}`}></div>
                    <div className={`${styles.skeleton} ${styles.orderInfoLineSkeleton}`} style={{ width: '160px' }}></div>
                </div>
                <div className={`${styles.skeleton} ${styles.orderTotalSkeleton}`}></div>
            </div>
        </div>
    );
}

// Skeleton para la lista de pedidos (3 pedidos)
export function OrderListSkeleton({ count = 3 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <OrderSkeleton key={i} />
            ))}
        </>
    );
}
