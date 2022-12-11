<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TODO File System</title>
</head>

<body>
    <h1>Todo List</h1>
    <form method="POST" action="submit.php">
        <input type="text" name="todo" />
        <input type="Submit" />
    </form>

    <?php
    $file = "todo.txt";
    if (file_exists($file)) {
        $fileItem = file_get_contents($file);
        $todoCollection = unserialize($fileItem);
        // echo $todoCollection;

        for ($i = 0; $i < sizeof($todoCollection); $i++) { ?>
            <li>
                <?php echo $todoCollection[$i]['todo']; ?>
                <input type="button" value="remove" onclick=" location.href='remove.php?index=<?php echo $i; ?>'; " />
            </li>
    <?php }
    } ?>

</body>

</html>