import Image from 'next/image'

export default function Header() {
  return (
    <header className="header">
      <div className="profile-image">
        <Image src="/profile_image.jpg" alt="Paulo Filipe" width={100} height={100} />
      </div>
      <h1 className="glitch" data-text="Paulo Filipe Moreira da Silva">Paulo Filipe Moreira da Silva</h1>
    </header>
  )
}