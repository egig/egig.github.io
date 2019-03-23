---
author: egig
comments: true
date: 2016-05-24 01:01:36+00:00
layout: post
slug: belajar-symfony-console-component
title: Belajar Symfony Console Component
wordpress_id: 54
categories:
- Tutorial
tags:
- PHP
- Symfony
---

Untuk memudahkan, kita harus sudah paham dulu penggunaan Composer dan konsep autoload-nya composer.
Symfony Console Component adalah component atau library dari symfony yang bisa kita gunakan untuk memudahkan pembuatan program CLI (Command Line Interface) menggunakan PHP. Untuk lebih lengkapnya silahkan merujuk pada dokumentasinya.
<!-- more -->


Membuat Program Sederhana

Langkah 1. Buka Terminal/CMD
Langkah 2. Buat folder project, untuk kali ini kita beri nama symfony-console-quickstart.


    
    
    mkdir symfony-console-quickstart
    cd symfony-console-quickstart
    



ke 3. Install dependensi yang di butuhkan

composer require symfony/console
Perintah diatas akan mendownload dependensi (Symfony Console Component) ke dalam folder vendor dan mencatatnya di file composer.json. (Perhatikan ada folder baru vendor dan file baru composer.json dan composer.lock setelah menjalankan command diatas).

Langkat 4. Buat file php untuk program yang akan kita buat, misal kita beri nama console.php.

Paste-kan kode program berikut:


    
    
    run();
    



ke 5. Sekarang, program CLI sudah bisa kita jalankan


    
    
    php console.php
    output:
    
        Console Tool
    
        Usage:
          command [options] [arguments]
    
        Options:
          -h, --help            Display this help message
          -q, --quiet           Do not output any message
          -V, --version         Display this application version
              --ansi            Force ANSI output
              --no-ansi         Disable ANSI output
          -n, --no-interaction  Do not ask any interactive question
          -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output,
         2 for more verbose output and 3 for debug
    
        Available commands:
          help  Displays help for a command
          list  Lists commands
    



Jika dilihat dari output di atas di bagian "Available commands", command atau perintah yang tersedia baru ada "help" dan "list" artinya kita masih belum bisa berbuat banyak selain menampilkan bantuan (help) dan dafter perintah yang tersedia (list).

Untuk itu kita akan coba menambahkan command/perintah sederhana: Hello World !.

Buat file class SayHelloCommand.php di folder project, paste code berikut:


    
    
    use Symfony\Component\Console\Command\Command;
    use Symfony\Component\Console\Input\InputInterface;
    use Symfony\Component\Console\Output\OutputInterface;
    
    class SayHelloCommand extends Command
    {
        protected function configure()
        {
            $this->setName('say:hello')
            ->setDescription('Say Hello');
        }
    
        protected function execute(InputInterface $input, OutputInterface $output)
        {
            $output->writeln('Hello World');
        }
    }
    



Setelah itu, kita harus edit program console kita (console.php) menjadi:


    
    
    add(new SayHelloCommand());
    $application->run();
    



Program console siap dijalankan:


    
    
    php console.php say:hello
    // harusnya keluar "Hello World"
    



Sekian Dulu.
