export const generateEventRegistrationHtml = (name: string, location: string, date: number): string => `
<!DOCTYPE html>
<html lang="ua">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Реєстрація успішна</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #fff;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
           font-weight: bold;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
      
    </style>
</head>
<body>
    <div class="container">
        <h1>Вітаємо з реєстрацією, ${name}!</h1>
        <p>Дякуємо за реєстрацію в нашому сервісі. Ми раді вітати вас у нашій спільноті!</p>
<p>Чекаєм на вас на ${location} о ${new Date(date).toString()}</p>
    </div>
</body>
</html>
`;
