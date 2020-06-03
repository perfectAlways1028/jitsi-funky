package com.jitsifunky;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.calendarevents.CalendarEventsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.oney.WebRTCModule.WebRTCModulePackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.oblador.keychain.KeychainPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CalendarEventsPackage(),
            new VectorIconsPackage(),
            new RNSoundPackage(),
            new WebRTCModulePackage(),
            new KCKeepAwakePackage(),
            new FastImageViewPackage(),
            new BackgroundTimerPackage(),
            new RNGestureHandlerPackage(),
            new SplashScreenReactPackage(),
            new RNLanguagesPackage(),
            new KeychainPackage(),
            new NAT64AddrInfoModulePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
