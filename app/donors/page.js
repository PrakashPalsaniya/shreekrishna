"use client"
import { useEffect, useState } from "react"
import { Users, Mail, IndianRupee, Trophy, Star, Heart } from "lucide-react"
import Image from "next/image"

// Simple Krishna-inspired logo component
const KrishnaLogo = ({ className }) => (
  <div className={`${className} flex items-center justify-center`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="currentColor">
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="20" cy="16" r="8" fill="currentColor" opacity="0.8"/>
      <circle cx="17" cy="14" r="1.5" fill="white"/>
      <circle cx="23" cy="14" r="1.5" fill="white"/>
      <path d="M15 24 Q20 28 25 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M12 8 Q20 12 28 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
    </svg>
  </div>
)

export default function DonorsPage() {
  const [donors, setDonors] = useState([])

  useEffect(() => {
    fetch("/api/donors")
      .then((res) => res.json())
      .then((data) => setDonors(data))
  }, [])

  // Calculate total donations
  const totalAmount = donors.reduce((sum, donor) => sum + Number.parseFloat(donor.amount || 0), 0)
  const topDonor =
    donors.length > 0
      ? donors.reduce((max, donor) =>
          Number.parseFloat(donor.amount || 0) > Number.parseFloat(max.amount || 0) ? donor : max,
        )
      : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 relative pb-20">
      <div className="absolute top-4 left-4 text-yellow-500 opacity-30">
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-yellow-400/50">
          <Image
            src="/krishna.jpg"
            alt="Lord Krishna"
            width={48}
            height={48}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <div className="absolute top-4 right-4 text-yellow-500 opacity-30">
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-yellow-400/50">
          <Image
            src="/krishna.jpg"
            alt="Lord Krishna"
            width={48}
            height={48}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-800 via-blue-700 to-purple-800 text-white relative">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400/30 via-amber-400/20 to-orange-400/30 rounded-full mb-6 p-2 shadow-2xl border-4 border-yellow-400/40">
              <div className="w-full h-full rounded-full overflow-hidden shadow-lg ring-2 ring-white/50">
                <Image
                  src="/krishna.jpg"
                  alt="Lord Krishna"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover object-center"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              Our Divine Donors
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Thank you to all our generous supporters who make our mission possible
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donors</p>
                <p className="text-2xl font-bold text-gray-900">{donors.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-3 rounded-xl">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Donation</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{topDonor ? Number.parseFloat(topDonor.amount).toLocaleString() : "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donors List */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Donor Hall of Fame
            </h2>
          </div>

          {donors.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No donors yet. Be the first to contribute!</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-indigo-600" />
                          Donor Name
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-purple-600" />
                          Email
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-2 text-yellow-600" />
                          Amount
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors.map((d, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gradient-to-r hover:from-indigo-25 hover:to-purple-25 transition-all duration-200 group"
                      >
                        <td className="py-4 px-6 border-b border-gray-100">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                              {d.name?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{d.name}</p>
                              <p className="text-sm text-gray-500">Donor #{i + 1}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 border-b border-gray-100">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400 group-hover:text-purple-500 transition-colors" />
                            <span className="text-gray-700">{d.email}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 border-b border-gray-100">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              ₹{Number.parseFloat(d.amount).toLocaleString()}
                            </div>
                            {Number.parseFloat(d.amount) === Number.parseFloat(topDonor?.amount || 0) && (
                              <Trophy className="w-4 h-4 ml-2 text-yellow-500" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                {donors.map((d, i) => (
                  <div key={i} className="p-6 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {d.name?.charAt(0)?.toUpperCase() || "A"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{d.name}</h3>
                          {Number.parseFloat(d.amount) === Number.parseFloat(topDonor?.amount || 0) && (
                            <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="truncate">{d.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Donor #{i + 1}</span>
                          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ₹{Number.parseFloat(d.amount).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-800 via-blue-700 to-purple-800 text-white py-3 shadow-2xl z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <span className="text-indigo-200 text-xs md:text-sm">Made with</span>
              <Heart className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2 text-red-400 fill-current animate-pulse" />
              <span className="text-indigo-200 text-xs md:text-sm">by</span>
            </div>
            <div className="text-sm md:text-base font-semibold text-white mb-1">
              Prakash Palsaniya, Gyan Prakash & Kanhaiya Yadav
            </div>
            <div className="text-indigo-200 text-xs">
              2023 IT Branch Students
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
