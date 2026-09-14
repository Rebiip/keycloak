<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=true; section>
    <#if section = "header">
        ${msg("facialVerificationTitle")}
    <#elseif section = "form">
        <link href="${url.resourcesPath}/css/face-login.css" rel="stylesheet" />
        <div id="face-capture"
             data-camera-initializing="${msg('facialCameraInitializing')}"
             data-camera-unsupported="${msg('facialCameraUnsupported')}"
             data-camera-denied="${msg('facialCameraDenied')}"
             data-camera-not-found="${msg('facialCameraNotFound')}"
             data-camera-error="${msg('facialCameraError')}"
             data-capture-error="${msg('facialCaptureError')}"
             data-verifying="${msg('facialVerifying')}">
            <p class="face-instruction">${msg("facialVerificationInstruction")}</p>

            <div class="face-camera-container">
                <video id="face-video" autoplay muted playsinline aria-label="${msg('facialCameraPreview')}"></video>
                <div class="face-position-guide" aria-hidden="true"></div>
            </div>
            <canvas id="face-canvas" hidden></canvas>

            <p id="camera-status" role="status" aria-live="polite"></p>

            <form id="face-form" action="${url.loginAction}" method="post">
                <input id="facialImage" name="facialImage" type="hidden" />
                <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                       id="kc-login" type="submit" value="${msg('verifyIdentity')}" disabled />
            </form>
        </div>
        <script src="${url.resourcesPath}/js/face-login.js"></script>
    </#if>
</@layout.registrationLayout>
