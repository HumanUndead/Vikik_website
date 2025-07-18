import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";

import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";

import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import "@styles/rc-drawer.css";
import { getDirection } from "@utils/get-direction";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function Noop({ children }: React.PropsWithChildren<{}>) {
  return <>{children}</>;
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <QueryClientProvider client={queryClientRef.current}>
        {/* @ts-ignore */}
        <HydrationBoundary state={pageProps.dehydratedState}>
          {/* @ts-ignore */}
          <ManagedUIContext>
            <Layout pageProps={pageProps}>
              <DefaultSeo />
              <Component {...pageProps} key={router.route} />
              <ToastContainer toastClassName="!text-white" />
            </Layout>
            <ManagedModal />
            <ManagedDrawer />
          </ManagedUIContext>
        </HydrationBoundary>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </AnimatePresence>
  );
};

export default appWithTranslation(CustomApp);
