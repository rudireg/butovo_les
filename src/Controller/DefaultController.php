<?php

namespace App\Controller;

use App\Entity\Join;
use App\Form\JoinType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="index")
     *
     * @return Response
     */
    public function indexAction(): Response
    {
        $form = $this->createForm(JoinType::class, new Join());
        return $this->render('index.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/privacy-policy", name="privacy_policy")
     *
     * @return Response
     */
    public function privacyPolicyAction(): Response
    {
        return $this->render('privacy_policy.html.twig');
    }
}
