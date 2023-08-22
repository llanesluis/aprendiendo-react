import { library as initialLibrary } from '../mocks/books.json'

export default function Books() {
  return (
    <main>
      {initialLibrary.map((item) => {
        const { book } = item
        return (
          <div key={book.ISBN}>
            <img src={book.cover} alt={book.title} />
            <p>{book.title}</p>
            <button>Agregar a mi lista</button>
          </div>
        )
      })}
    </main>
  )
}
