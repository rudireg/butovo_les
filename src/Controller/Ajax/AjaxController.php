<?php

namespace App\Controller\Ajax;

use App\Controller\Traits\GoogleReCaptchaValidate;
use ReCaptcha\ReCaptcha;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AjaxController extends AbstractController
{
    use GoogleReCaptchaValidate;

    /**
     * @Route("/ajax/add-activist", methods="POST", name="ajax_add_activist")
     */
    public function addActivistAction (Request $request, \Swift_Mailer $mailer, ReCaptcha $reCaptcha): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$this->isCsrfTokenValid('join', $data['join[_token]'])) {
            return new JsonResponse(['error' => 1, 'message' => 'Что-то пошло не так, попробуйте снова']);
        }

        $phone = trim($data['join[phone]'] ?? '');
        $email = trim($data['join[email]'] ?? '');
        $description = trim($data['join[description]'] ?? '');
        if (empty($phone) || empty($email) || empty($description)) {
            return new JsonResponse(['error' => 1, 'message' => 'Все поля обязательны к заполнению.']);
        }

        // check captcha
        try {
            $this->googleCaptchaValidate($request, $reCaptcha, $data['g-recaptcha-response'] ?? '');
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 1, 'message' => 'Каптча разгадана неверно.']);
        }

        $toEmail = $this->getParameter('toEmail');
        $message = (new \Swift_Message('Заявка Forest-Butovo.ru'))
            ->setFrom('robot@forest-butovo.ru')
            ->setTo($toEmail)
            ->setBody(
                $this->renderView(
                    'emails/join.html.twig',
                    [
                        'phone' => $phone,
                        'email' => $email,
                        'description' => $description,
                    ]
                ),
                'text/html'
            )
        ;

        if ($mailer->send($message)) {
            return new JsonResponse(['ok' => 1]);
        }
        return new JsonResponse(['error' => 1, 'message' => 'Что-то пошло не так, попробуйте снова']);
    }
}
