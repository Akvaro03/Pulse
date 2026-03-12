"use client";

import { useState } from "react";
import { Zap, Eye, EyeOff, ArrowRight, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { Axios } from "axios";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (mode === "register") {
        if (!name.trim()) {
          setError("Introduce tu nombre");
          setLoading(false);
          return;
        }
        if (!email.trim()) {
          setError("Introduce tu email");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("La contraseña debe tener al menos 6 caracteres");
          setLoading(false);
          return;
        }
        const result = axios
          .post("/api/auth/register", {
            name: name.trim(),
            email: email.trim(),
            password,
          })
          .then((res) => {
            console.log("Registro exitoso:", res.data);
          });

        // if (!result.ok) {
        //   setError(result.error || "Error al crear la cuenta");
        // }
      } else {
        if (!email.trim() || !password) {
          setError("Completa todos los campos");
          setLoading(false);
          return;
        }
        const result = axios
          .post("/api/auth/login", {
            email: email.trim(),
            password,
          })
          .then((res) => {
            console.log("Inicio de sesion exitoso:", res.data);
          })
          .catch((res) => {
            console.log("Hubo un error ", res);
          });

        // if (!result.ok) {
        //   setError(result.error || "Error al iniciar sesion");
        // }
      }
      setLoading(false);
    }, 400);
  }

  function switchMode() {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Background glow effect */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center rounded-2xl bg-primary/15 p-3.5">
            <Zap className="size-7 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="font-mono text-2xl font-bold tracking-tight text-foreground">
              VERTIMAX
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Training Planner Pro
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              {mode === "login" ? "Bienvenido de vuelta" : "Crear cuenta"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Inicia sesion para acceder a tus planes"
                : "Registrate para empezar a planificar"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm text-muted-foreground">
                  Nombre
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 border-border/60 bg-secondary/50 pl-10 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 border-border/60 bg-secondary/50 pl-10 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-sm text-muted-foreground"
              >
                {mode === "login"
                  ? "Contraseña"
                  : "Contraseña (min. 6 caracteres)"}
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-border/60 bg-secondary/50 pl-10 pr-11 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-1 h-11 w-full gap-2 bg-primary text-primary-foreground font-semibold transition-all hover:brightness-110 disabled:opacity-50"
            >
              {loading ? (
                <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <>
                  {mode === "login" ? "Iniciar sesion" : "Crear cuenta"}
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-xs text-muted-foreground">o</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          {/* Switch mode */}
          <button
            type="button"
            onClick={switchMode}
            className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {mode === "login" ? (
              <>
                {"¿No tienes cuenta?"}{" "}
                <span className="font-medium text-primary">Registrate</span>
              </>
            ) : (
              <>
                {"¿Ya tienes cuenta?"}{" "}
                <span className="font-medium text-primary">Inicia sesion</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          Tus datos se almacenan de forma local en tu navegador
        </p>
      </div>
    </div>
  );
}
