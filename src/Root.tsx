import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { DeadlineNotification } from "./Notification/DeadlineNotification";
import { notificationSchema } from "./Notification/schema";
import { StockAdsMotion, stockAdsSchema } from "./StockAds/StockAdsMotion";
import { TOTAL_FRAMES } from "./StockAds/theme";
import {
  StockAdsFutura,
  stockAdsFuturaSchema,
} from "./StockAds/futura/StockAdsFutura";
import {
  StockAdsPrime,
  stockAdsPrimeSchema,
} from "./StockAds/prime/StockAdsPrime";
import {
  StockAdsGlass,
  stockAdsGlassSchema,
} from "./StockAds/glass/StockAdsGlass";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StockAds-Glass-4x5-ST"
        component={StockAdsGlass}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1350}
        schema={stockAdsGlassSchema}
        defaultProps={{ showSubtitles: true }}
      />
      <Composition
        id="StockAds-Glass-4x5-clean"
        component={StockAdsGlass}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1350}
        schema={stockAdsGlassSchema}
        defaultProps={{ showSubtitles: false }}
      />

      <Composition
        id="StockAds-Prime-4x5-ST"
        component={StockAdsPrime}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1350}
        schema={stockAdsPrimeSchema}
        defaultProps={{ showSubtitles: true }}
      />
      <Composition
        id="StockAds-Prime-4x5-clean"
        component={StockAdsPrime}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1350}
        schema={stockAdsPrimeSchema}
        defaultProps={{ showSubtitles: false }}
      />

      <Composition
        id="StockAds-Futura-4x5-ST"
        component={StockAdsFutura}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1350}
        schema={stockAdsFuturaSchema}
        defaultProps={{ showSubtitles: true }}
      />
      <Composition
        id="StockAds-Futura-4x5-clean"
        component={StockAdsFutura}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1350}
        schema={stockAdsFuturaSchema}
        defaultProps={{ showSubtitles: false }}
      />

      <Composition
        id="StockAds-4x5-ST"
        component={StockAdsMotion}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1350}
        schema={stockAdsSchema}
        defaultProps={{ showSubtitles: true }}
      />
      <Composition
        id="StockAds-4x5-clean"
        component={StockAdsMotion}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1350}
        schema={stockAdsSchema}
        defaultProps={{ showSubtitles: false }}
      />

      <Composition
        id="DeadlineNotification"
        component={DeadlineNotification}
        durationInFrames={300}
        fps={30}
        width={720}
        height={1280}
        schema={notificationSchema}
        defaultProps={{
          appName: "Projet",
          title: "Deadline client",
          message: "Livraison du rendu final demain à 18h00",
          time: "maintenant",
        }}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
