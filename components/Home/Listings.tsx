/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/newButton"

export const Listings=()=>{
    return(
        <>
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Listings
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of the latest items listed on our Solana
                  Marketplace.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      width="200"
                      height="200"
                      alt="Item 1"
                      className="rounded-md"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-bold">Vintage Camera</h3>
                      <p className="text-muted-foreground">
                        Fully functional 35mm film camera
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                          className="h-6 w-6"
                          alt="img"
                        />
                        <span className="font-bold">1.5 SOL</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Buy Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src="https://i.pinimg.com/236x/d5/07/92/d50792dd3cecd96029801316fc8dbb62.jpg"
                      width="200"
                      height="200"
                      alt="Item 2"
                      className="rounded-md"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-bold">Vintage Typewriter</h3>
                      <p className="text-muted-foreground">
                        Fully restored 1950s typewriter
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                          className="h-6 w-6"
                          alt="img"
                        />
                        <span className="font-bold">2.0 SOL</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Buy Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src="https://i.pinimg.com/236x/96/62/ef/9662efab555ca8bc2d25a971e8ebd914.jpg"
                      width="200"
                      height="200"
                      alt="Item 3"
                      className="rounded-md"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-bold">
                        Vintage Vinyl Record
                      </h3>
                      <p className="text-muted-foreground">
                        Rare 1970s vinyl record in mint condition
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                          className="h-6 w-6"
                          alt="img"
                        />
                        <span className="font-bold">0.8 SOL</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Buy Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </>
    )
}