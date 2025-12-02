# React Native Data Storage and Local Database Notes

Notes focusing on data storage, synchronization, and offline working needs in the React Native course. Each file first summarizes the relevant approach, then shows how you can use it with an Expo + Express based REST API through two examples.

## File Structure
- [storage/AsyncStorage.md](AsyncStorage.md)
- [storage/SQLite.md](SQLite.md)
- [storage/Realm.md](Realm.md)
- [storage/MMKV.md](MMKV.md)
- [storage/MySQL.md](MySQL.md)

## Usage Recommendations
- The codes in the notes are kept simple to work exactly with Expo's `Blank (JavaScript)` template. On the backend side, you can quickly set up a mini REST API using the `express` package.
- Each example offers a short Express endpoint along with the client-side state flow. Running the API first and then testing the React Native side allows you to see the synchronization behavior.
- During the lesson, first read the summary section and discuss the data flow with the students; then code the examples live or run the existing snippet.

## Additional Resources
- [React Native Official Documentation](https://reactnative.dev/docs/asyncstorage)
- [Expo SQLite Library](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [Realm React Native](https://www.mongodb.com/docs/realm/sdk/react-native/)
- [Express.js](https://expressjs.com/)
