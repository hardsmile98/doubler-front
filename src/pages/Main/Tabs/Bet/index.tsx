function Bet() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <button className='w-[100%] bg-primary-light dark:bg-primary-dark text-white p-3 rounded-xl'>
        Make bet
      </button>
    </form>
  );
}

export default Bet;
