import { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import PocketBase from 'pocketbase';

function App() {
  const client = new PocketBase('http://127.0.0.1:8090');
  // realtime db
  const [realtimeWord, setRealtimeWord] = useState('');
  const [recordId, setRecordId] = useState('');

  const updateWord = async (rec_id, letter) => {
    try {
      await client.records.update('wordle', rec_id, {
        word: letter,
      });
    } catch (error) {
      console.log('Error occurred while updating the todo', error);
    }
  };

  const initWord = async () => {
    try {
      let word = await client.records.getFullList('wordle', 1, {
        sort: '-created',
      });
      if (word.length === 0) {
        await client.records.create('wordle', {
          word: '',
        });
        let w = await client.records.getFullList('wordle', 1, {
          sort: '-created',
        });
        setRecordId(w[0].id);
      } else {
        setRecordId(word[0].id);
      }
    } catch (error) {
      console.log('Error occurred while getting word', error.data);
    }
  };
  console.log(recordId);
  useEffect(() => {
    client.realtime.subscribe('wordle', function (e) {
      console.log('realtime', e.record);
      setRealtimeWord(e.record);
    });
    return () => {
      client.realtime.unsubscribe();
    };
  });

  useEffect(() => {
    initWord();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <DebounceInput
        minLength={1}
        debounceTimeout={0}
        onChange={(e) => {
          updateWord(recordId, e.target.value);
        }}
      />
      <p>{realtimeWord.word}</p>
    </div>
  );
}

export default App;
