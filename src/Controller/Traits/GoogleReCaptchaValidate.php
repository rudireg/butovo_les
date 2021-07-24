<?php

namespace App\Controller\Traits;

use ReCaptcha\ReCaptcha;
use Symfony\Component\HttpFoundation\Request;

trait GoogleReCaptchaValidate
{
    /**
     * @param Request   $request
     * @param ReCaptcha $reCaptcha
     * @param string    $value
     * @throws \Exception
     */
    public function googleCaptchaValidate(Request $request, ReCaptcha $reCaptcha, string $value = ''): void
    {
        $reCaptchaResponse = $request->request->get('g-recaptcha-response', null);
        if (empty($reCaptchaResponse)) {
            $reCaptchaResponse = $value;
        }

        if (empty($reCaptchaResponse)) {
            throw new \Exception('Google recaptcha is empty');
        }

        $result = $reCaptcha
            ->setExpectedHostname($request->getHost())
            ->verify($reCaptchaResponse, $request->getClientIp());

        if (!$result->isSuccess()) {
            throw new \Exception('The captcha is invalid. Please try again.');
        }
    }
}
