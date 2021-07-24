<?php

namespace App\Form;

use App\Entity\Join;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Routing\RouterInterface;

class JoinType extends AbstractType
{
    /**
     * @var RouterInterface
     */
    private RouterInterface $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->setAction($this->router->generate('ajax_add_activist'))
            ->setMethod('POST')
            ->add('phone', TelType::class, [
                'required' => true,
                'label' => false,
                'attr' => [
                    'maxlength' => 20,
                    'placeholder' => 'Телефон',
                ],
            ])
            ->add('email', EmailType::class, [
                'required' => true,
                'label' => false,
                'attr' => [
                    'maxlength' => 128,
                    'placeholder' => 'Email',
                ],
            ])
            ->add('description', TextareaType::class, [
                'required' => true,
                'label' => false,
                'attr' => [
                    'maxlength' => 1024,
                    'placeholder' => 'Опишите чем Вы можете быть полезны (какую посильную помощь Вы готовы оказать — участие в акциях, печать и распространение промо-материалов, иная материально-техническая помощь)',
                ],
            ])
            ->add('captcha', ReCaptchaType::class, [
                'type' => 'invisible',
                'mapped' => false,
            ])
            ->add('save', SubmitType::class, [
                'label' => 'Отправить',
                'attr' => [
                    'class' => 'form-btn',
                ],
            ])
            ->add('cancel', ButtonType::class, [
                'label' => 'Отмена',
                'attr' => [
                    'class' => 'form-btn form-btn-cancel',
                    'data-close' => '',
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class'      => Join::class,
            'csrf_protection' => true,
            'csrf_field_name' => '_token',
            'csrf_token_id'   => 'join',
        ]);
    }
}
