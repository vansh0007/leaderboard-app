// import { render, screen,fireEvent } from '@testing-library/react';
// import UserList from '../src/components/UserList';
// import { LeaderboardProvider } from '../src/contexts/LeaderBoardContext';
// import AddUserForm from '../src/components/AddUserForm';



// jest.mock('axios');

// const mockUsers = [
//   { id: 1, name: 'Test User', points: 10 }
// ];

// test('renders user list', () => {
//   render(
//     <LeaderboardProvider value={{ users: mockUsers }}>
//       <UserList />
//     </LeaderboardProvider>
//   );

//   expect(screen.getByText('Test User')).toBeInTheDocument();
//   expect(screen.getByText('10')).toBeInTheDocument();
// });


// test('submits form data', () => {
//   const mockAddUser = jest.fn();
  
//   render(<AddUserForm addUser={mockAddUser} />);
  
//   fireEvent.change(screen.getByLabelText(/name/i), { 
//     target: { value: 'New User' } 
//   });
//   fireEvent.click(screen.getByText(/add user/i));
  
//   expect(mockAddUser).toHaveBeenCalledWith({
//     name: 'New User',
//     age: '',
//     address: ''
//   });
// });