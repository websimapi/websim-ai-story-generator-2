<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the data from the form
    $prompt = $_POST['prompt'] ?? '';
    $additionalContext = $_POST['data'] ?? '';

    // Here you would normally make the actual API call to your AI service
    // For now, we'll simulate a response
    $story = "In the vast expanse of space, our explorer found something unexpected...\n\n";
    $story .= "Additional context considered: " . $additionalContext;

    // You can replace the above with your actual API call:
    /*
    $response = file_get_contents('your_api_endpoint', false, stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/json',
            'content' => json_encode([
                'prompt' => $prompt,
                'data' => $additionalContext
            ])
        ]
    ]));
    $story = json_decode($response, true)['completion'];
    */

    // Redirect back to the form with the generated story
    $_POST['generated_story'] = $story;
    include 'index.html';
} else {
    // Redirect to index if accessed directly
    header('Location: index.html');
    exit;
}
?>