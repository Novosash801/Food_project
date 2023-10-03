<?php
$_POST = json_decode(file_get_contents("php://input"), true); // берет данные с клиента, превращает их в строку 
echo var_dump($_POST);