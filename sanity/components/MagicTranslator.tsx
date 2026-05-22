import { useCallback, useState } from 'react'
import { Stack, Button, Flex, Box } from '@sanity/ui'
import { set, useFormValue } from 'sanity'

export default function MagicTranslator(props: any) {
  // We use renderDefault to let Sanity automatically decide if it should 
  // be a small text box or a massive multi-line text area!
  const { onChange, path, renderDefault } = props
  const [isTranslating, setIsTranslating] = useState(false)

  const parentPath = path.slice(0, -1)
  const esValue = useFormValue([...parentPath, 'es']) as string

  const handleTranslate = useCallback(async () => {
    if (!esValue) {
      alert("¡Escribe el texto en español primero! (Write the Spanish text first!)")
      return
    }

    setIsTranslating(true)
    try {
      // 1. Split the massive article by paragraphs (hitting "Enter")
      const paragraphs = esValue.split('\n');
      const translatedParagraphs = [];

      for (const p of paragraphs) {
        if (!p.trim()) {
          translatedParagraphs.push(''); // Preserve empty lines!
          continue;
        }

        // 2. THE CHUNKING ENGINE
        // Slices the paragraph into 400-character chunks safely at word boundaries 
        // to bypass the 500-character API limit.
        const chunks = p.match(/(.|[\r\n]){1,400}(?=\s|$)/g) || [p];
        let translatedChunk = '';

        // 3. Translate each chunk seamlessly
        for (const chunk of chunks) {
           const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=es|en`);
           const data = await res.json();
           
           if (data.responseData?.translatedText) {
             translatedChunk += data.responseData.translatedText + ' ';
           }
        }
        translatedParagraphs.push(translatedChunk.trim());
      }

      // 4. Stitch it all back together and inject it into the Sanity database!
      onChange(set(translatedParagraphs.join('\n')))
    } catch (error) {
      console.error("Translation failed", error)
      alert("Error translating text. The API might be overloaded.")
    } finally {
      setIsTranslating(false)
    }
  }, [esValue, onChange])

  return (
    <Stack space={3}>
      <Flex gap={2} align="flex-end">
        <Box flex={1}>
          {/* Renders the native Sanity input UI perfectly */}
          {renderDefault(props)}
        </Box>
        <Button
          mode="ghost"
          tone="primary"
          text={isTranslating ? "Traduciendo..." : "✨ Auto-Translate"}
          onClick={handleTranslate}
          disabled={isTranslating}
          padding={3}
          style={{ marginBottom: '2px' }}
        />
      </Flex>
    </Stack>
  )
}