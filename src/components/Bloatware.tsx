"use client";
import { useUser } from "@clerk/nextjs";
import Script from "next/script";

import { RoleGuard } from "~/UserMetaProvider";

export const Bloatware = () => {
  // Get the current user
  const user = useUser();

  return (
    <>
      {/* Show the Usersnap widget if the user has the beta role */}
      <RoleGuard roles={["beta"]}>
        <Script id="user-snap" strategy="lazyOnload">
          {`window.onUsersnapLoad = function(api) {
              api.init();
            }
            var script = document.createElement('script');
            script.defer = 1;
            script.src = 'https://widget.usersnap.com/global/load/3ed70fa5-716b-458c-b23b-3b5fb33a9f5c?onload=onUsersnapLoad';
            document.getElementsByTagName('head')[0].appendChild(script);`}
        </Script>
      </RoleGuard>

      {/* Rewardful */}
      <Script id="rewardful" strategy="lazyOnload">
        {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
      </Script>
      <Script
        id="https://r.wdfl.co/rw.js"
        strategy="lazyOnload"
        data-rewardful="fd6673"
      ></Script>

      {/* HubSpot Tracking */}
      <RoleGuard roles={["early-access", "all-access"]}>
        <Script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/39921098.js"
        ></Script>
      </RoleGuard>

      {/* Canny Stuff */}
      {!!user.isLoaded &&
        !!user.isSignedIn &&
        user.user.primaryEmailAddress != null &&
        user.user.createdAt != null && (
          <>
            {/* Canny SDK */}
            <Script id="canny-sdk">
              {`!function(w,d,i,s){function l(){if(!d.getElementById(i)){var f=d.getElementsByTagName(s)[0],e=d.createElement(s);e.type="text/javascript",e.async=!0,e.src="https://canny.io/sdk.js",f.parentNode.insertBefore(e,f)}}if("function"!=typeof w.Canny){var c=function(){c.q.push(arguments)};c.q=[],w.Canny=c,"complete"===d.readyState?l():w.attachEvent?w.attachEvent("onload",l):w.addEventListener("load",l,!1)}}(window,document,"canny-jssdk","script");`}
            </Script>
            {/* Use the Canny SDK to identify the current user of your website */}
            <Script id="canny-code">
              {`Canny('identify', {
              appID: '646535c66ab08ff7cfc6480d',
              user: {
                // Replace these values with the current user's data
                email: '${user.user.primaryEmailAddress.emailAddress}',
                name: '${user.user.fullName}',
                id: '${user.user.id}',
                
                // These fields are optional, but recommended:
                avatarURL: '${user.user.imageUrl}',
                created: '${new Date(user.user.createdAt).toISOString()}',
              },
            });`}
            </Script>
          </>
        )}
    </>
  );
};

export default Bloatware;
