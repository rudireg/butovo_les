<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class Join
{
    /**
     * @var string
     * @Assert\NotBlank()
     */
    private string $phone;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private string $email;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private string $description;

    /**
     * @return string
     */
    public function getPhone(): string
    {
        return $this->phone;
    }

    /**
     * @param string $phone
     * @return Join
     */
    public function setPhone(string $phone): Join
    {
        $this->phone = $phone;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return Join
     */
    public function setEmail(string $email): Join
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     * @return Join
     */
    public function setDescription(string $description): Join
    {
        $this->description = $description;
        return $this;
    }
}
