 <?php
session_start();
header("Location: {$_SERVER['HTTP_REFERER']}")
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
$i = $_REQUEST['index'];
array_splice($_SESSION['todoCollection'], $i, 1);
?>
</body>
</html>