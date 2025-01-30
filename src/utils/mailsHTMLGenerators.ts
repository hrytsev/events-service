export const generateHtml = (login: string, code: number): string => `
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
        }
        h1 {
            color: #4CAF50;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
        .code {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Вітаємо з реєстрацією, ${login}!</h1>
        <p>Дякуємо за реєстрацію на нашому сайті. Ми раді вітати вас у нашій спільноті!</p>
        <p>Нижче наведений ваш код для верифікації акаунту:</p>
        <p class="code">${code}</p>
        <p>Якщо у вас є питання, не соромтесь звертатися до нашої підтримки.</p>
        <p>Бажаємо приємного користування!</p>
    </div>
</body>
</html>
`;
export const generatePasswordResetHtml = (login: string, code: number): string => `
<!DOCTYPE html>
<html lang="ua">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Відновлення паролю</title>
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
        }
        h1 {
            color: #ff9800;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
        .code {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Відновлення паролю, ${login}</h1>
        <p>Ви запросили відновлення паролю для свого акаунту. Якщо це були ви, скористайтесь кодом нижче:</p>
        <p class="code">${code}</p>
        <p>Якщо ви не надсилали запит на відновлення паролю, будь ласка, проігноруйте цей лист або зверніться до нашої підтримки.</p>
        <p>Бажаємо вам безпечного користування нашим сервісом!</p>
    </div>
</body>
</html>
`;