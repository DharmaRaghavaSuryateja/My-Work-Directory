<?php
session_start();
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
if (!isset($_SESSION['todoCollection'])) {
    $_SESSION['todoCollection'] = [];
}
?>


    <form action="storeItem.php" method="post">
        <label for="todo">Enter:</label>
        <input type="text" name="item" id="todo">
        <input type="submit" value="Submit">
    </form>

<ul>
   <?php for ($i = 0; $i < sizeof($_SESSION["todoCollection"]); $i++) {?>
        <li><?php echo $_SESSION["todoCollection"][$i]; ?> <input type="button" value="Remove"
        onclick="location.href = 'removeItem.php?index=<?php echo $i; ?>'"></li>
    <?php }?>
</ul>



</body>
</html>
